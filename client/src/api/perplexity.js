import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchCoinSummary = async (coinName) => {
  const res = await axios.post(`${API_BASE}/api/perplexity`, { coinName });
  return res.data.summary;
};
