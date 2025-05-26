import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AISummary({ markdown }) {
  if (!markdown) return <div>AI 요약 정보가 없습니다.</div>;
  try {
    return (
      <div className="ai-summary-box">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    );
  } catch (e) {
    return <div>AI 요약을 표시하는 중 오류가 발생했습니다.</div>;
  }
}
