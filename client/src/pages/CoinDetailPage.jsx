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
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchCoinDetail(coinId).catch(() => null),
      fetchCoinSummary(coinId).catch(() => ""),
      fetchCoinChart(coinId).catch(() => null),
    ])
      .then(([detailData, summaryData, chartData]) => {
        if (!detailData) {
          setError("코인 정보를 불러오지 못했습니다.");
        }
        setDetail(detailData);
        setSummary(summaryData);
        setChart(chartData);
      })
      .catch(() => setError("데이터를 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, [coinId]);

  if (loading) return <div className="loading-box">로딩중...</div>;
  if (error) return <div className="error-box">{error}</div>;
  if (!detail)
    return <div className="error-box">코인 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={onBack}>
        ← 뒤로가기
      </button>
      <h2>
        {detail.name} ({detail.symbol?.toUpperCase()})
      </h2>
      <img src={detail.image?.large} alt={detail.name} width={64} />
      <div className="price">
        현재가: $
        {detail.market_data?.current_price?.usd
          ? detail.market_data.current_price.usd.toLocaleString()
          : "정보 없음"}
      </div>
      <div className="market-cap">
        시가총액: $
        {detail.market_data?.market_cap?.usd
          ? detail.market_data.market_cap.usd.toLocaleString()
          : "정보 없음"}
      </div>
      <div className="large-chart-wrapper">
        {chart ? (
          <CoinLargeChart prices={chart.prices} />
        ) : (
          <div>차트 정보 없음</div>
        )}
      </div>
      <div className="ai-summary-box">
        <AISummary markdown={summary} />
      </div>
    </div>
  );
}

export default CoinDetailPage;
