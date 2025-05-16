import React, { useEffect, useState } from "react";
import { fetchCoinSummary } from "../api/perplexity";
import AISummary from "../components/AISummary";
import CoinLargeChart from "../components/CoinLargeChart";
import { fetchCoinDetail, fetchCoinChart } from "../api/coingecko";

function CoinDetailPage({ coinId, onBack }) {
  const [detail, setDetail] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    fetchCoinDetail(coinId).then((data) => {
      setDetail(data);
      setLoading(false);
    });
    fetchCoinSummary(coinId).then(setSummary);
  }, [coinId]);

  if (loading || !detail) return <div>로딩중...</div>;

  return (
    <div>
      <button onClick={onBack}>← 뒤로가기</button>
      <h2>
        {detail.name} ({detail.symbol.toUpperCase()})
      </h2>
      <img src={detail.image?.large} alt={detail.name} width={64} />
      <div>
        현재가: ${detail.market_data?.current_price?.usd?.toLocaleString()}
      </div>
      <div>
        시가총액: ${detail.market_data?.market_cap?.usd?.toLocaleString()}
      </div>
      <div>{chart && <CoinLargeChart prices={chart.prices} />}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: detail.description?.ko || detail.description?.en || "",
        }}
      />
      <h3>최신 요약 (AI)</h3>
      <div style={{ background: "#fafafa", padding: 16, borderRadius: 8 }}>
        <AISummary markdown={summary} />
      </div>
    </div>
  );
}

export default CoinDetailPage;
