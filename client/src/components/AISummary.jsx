import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AISummary({ markdown }) {
  return (
    <div
      style={{
        background: "#fafafa",
        padding: 16,
        borderRadius: 8,
        margin: "16px 0",
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
