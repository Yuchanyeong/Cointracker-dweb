export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  let coinName;

  if (req.body && req.body.coinName) {
    coinName = req.body.coinName;
  } else {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const body = JSON.parse(Buffer.concat(buffers).toString());
      coinName = body.coinName;
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }
  if (!coinName) {
    return res.status(400).json({ error: "Missing coinName in body" });
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing Perplexity API key" });
  }

  const prompt = `
"${coinName}" 관련 최근 뉴스 요약.

오늘 기준으로 "${coinName}" 관련 가장 최근 뉴스 헤드라인과 주요 내용을 최대 5개까지 **마크다운 형식**으로 요약해줘.
먼저 # ${coinName} 관련 최근 뉴스 요약 으로 시작할거야. 마크다운 형식으로 제목부터 시작할거야.
각 뉴스는 아래 예시처럼 보여줘:

1. 헤드라인
   - **내용 요약:** (한두 문장)
   - **링크:** (뉴스 원문 링크)

- 관련 뉴스가 5개 미만이면 있는 것만 보여줘.
- 각 뉴스마다 헤드라인, 내용 요약, 링크만 딱 보여주고, 그 외 설명이나 추가 멘트는 절대 하지말아줘.
- 어떠한 경우에도 "뉴스 없음" 이나 "관련 뉴스가 없습니다" 같은 문구는 사용하지 말아줘.
- 뉴스 요약을 다 출력했다면 다른 어떠한 말도 추가적으로 출력하지말아줘.
`;
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar", // 공식 가이드 모델명
        stream: false,
        max_tokens: 1024,
        frequency_penalty: 1,
        temperature: 0.0,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Perplexity API error:", errorText);
      return res.status(500).json({ error: errorText });
    }
    const data = await response.json();
    res
      .status(200)
      .json({ summary: data.choices?.[0]?.message?.content || "" });
  } catch (e) {
    console.error("Server error:", e);
    res.status(500).json({ error: e.message });
  }
}
