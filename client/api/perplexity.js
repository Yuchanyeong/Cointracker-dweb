import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

//특정 코인 이름을 받아서 post요청.
export const fetchCoinSummary = async (coinName) => {
  const res = await axios.post(`${API_BASE}/api/perplexity`, { coinName });
  return res.data.summary;
};
