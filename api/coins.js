export default async function handler(request, response) {
  const apiKey = process.env.COINGECKO_API_KEY;
  const { vs_currency = "usd", per_page = 100, page = 1 } = request.query;

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=true&price_change_percentage=1h,24h`;

  const headers = apiKey ? { "x-cg-demo-api-key": apiKey } : {};

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error("CoinGecko API error");
    const data = await res.json();
    response.status(200).json(data);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
}
