export default async function handler(req, res) {
  const { id, vs_currency = "usd", days = 7 } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing coin id" });
  }

  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
