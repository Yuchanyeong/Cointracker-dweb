// vercel_serverless/api/coin.js
export default async function handler(req, res) {
  const apiKey = process.env.COINGECKO_API_KEY;
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing coin id" });
  }

  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const headers = apiKey ? { "x-cg-demo-api-key": apiKey } : {};

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
