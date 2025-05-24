import React, { useEffect, useState } from "react";
import { fetchCoinDetail, fetchCoinChart } from "../../api/coingecko";
import { fetchCoinSummary } from "../../api/perplexity";
import AISummary from "../components/AISummary";
import CoinLargeChart from "../components/CoinLargeChart";

function CoinDetailPage({ coinId, onBack }) {
  const [detail, setDetail] = useState(null);
  const [summary, setSummary] = useState("");
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoinDetail(coinId).then((data) => {
      setDetail(data);
      setLoading(false);
    });
    fetchCoinSummary(coinId).then(setSummary);
    fetchCoinChart(coinId).then(setChart);
  }, [coinId]);

  if (loading || !detail) return <div className="loading-box">로딩중...</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={onBack}>
        ← 뒤로가기
      </button>
      <h2>
        {detail.name} ({detail.symbol.toUpperCase()})
      </h2>
      <img src={detail.image?.large} alt={detail.name} width={64} />
      <div className="price">
        현재가: ${detail.market_data?.current_price?.usd?.toLocaleString()}
      </div>
      <div className="market-cap">
        시가총액: ${detail.market_data?.market_cap?.usd?.toLocaleString()}
      </div>
      <div className="large-chart-wrapper">
        {chart && <CoinLargeChart prices={chart.prices} />}
      </div>
      <div>
        <h3>최신 요약 (AI)</h3>
      </div>
      <div className="ai-summary-box">
        <AISummary markdown={summary} />
      </div>
    </div>
  );
}

export default CoinDetailPage;
