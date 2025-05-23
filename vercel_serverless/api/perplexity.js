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

  const prompt = `너는 지금 비트코인에 대한 정보를 수집해서 알려주는 ai야. 다음 내용을 한국어로 알려줘. 오늘 기준으로 ${coinName} 관련 가장 최근 뉴스 헤드라인과 주요 내용을 5개 **마크다운 형식**으로 요약해줘. 
   관련 기사가 없다면 굳이 5개를 가져오지 않아도 돼. 있는것만 가져와줘.  기사 링크도 포함해줘. 답변 틀은 이렇게 해줘. 
   각 기사내용마다 헤드라인 ,내용요약 ,링크 말해주면 되고, 따로 설명을 할 필요는 없어. 요구한 내용만 딱 말해. 이상한 말 추가하지말고 딱 용건만 보여줘. 만약 관련된 내용을 찾지 못했다면 굳이 언급하지마.`;

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
