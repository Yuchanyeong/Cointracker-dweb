import React, { useEffect, useState, useMemo } from "react";
import { fetchCoinDetail, fetchCoinChart } from "../../api/coingecko";
import { fetchCoinSummary } from "../../api/perplexity";
import AISummary from "../components/AISummary";
import CoinLargeChart from "../components/CoinLargeChart";

// 1) HTML 태그를 날려버리고, </p> 등은 줄바꿈으로 바꿔 주는 헬퍼
function stripHtml(html) {
  return html
    .replace(/<\/p>/gi, "\n") // </p> → 개행
    .replace(/<br\s*\/?>/gi, "\n") // <br> → 개행
    .replace(/<[^>]+>/g, "") // 나머지 태그 전부 삭제
    .split("\n")
    .map((l) => l.trim()) // 앞뒤 공백 제거
    .filter(Boolean) // 빈 줄 제거
    .join("\n");
}

function CollapsibleDescription({ htmlString, previewLines = 5 }) {
  const lines = useMemo(() => htmlString.split("\n"), [htmlString]);
  const [open, setOpen] = useState(false);

  return (
    <div className="description">
      {(open ? lines : lines.slice(0, previewLines)).map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      {lines.length > previewLines && (
        <button className="toggle-btn" onClick={() => setOpen((o) => !o)}>
          {open ? "접기" : "더보기"}
        </button>
      )}
    </div>
  );
}

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

  // 2) stripHtml 로 순수 텍스트만 뽑아서 넘겨줍니다
  const rawHtml = detail.description?.ko || detail.description?.en || "";
  const text = useMemo(() => stripHtml(rawHtml), [rawHtml]);

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

      {/* ✂️ 이전 dangerouslySetInnerHTML 삭제 */}
      {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}

      {/* ✅ 변경된 부분: 접기·펼침 가능한 문단 컴포넌트 */}
      <CollapsibleDescription htmlString={text} previewLines={5} />

      <h3>최신 요약 (AI)</h3>
      <div className="ai-summary-box">
        <AISummary markdown={summary} />
      </div>
    </div>
  );
}

export default CoinDetailPage;
