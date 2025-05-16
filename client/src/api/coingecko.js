import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

export const fetchCoins = async () => {
  const res = await axios.get(`${API_BASE}/api/coins`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: true,
      price_change_percentage: "1h,24h",
    },
  });
  return res.data;
};

// 이 부분이 반드시 있어야 합니다!
export const fetchCoinDetail = async (id) => {
  const res = await axios.get(`${API_BASE}/api/coin`, {
    params: { id },
  });
  return res.data;
};
// 7일 가격 그래프 데이터 불러오기
export const fetchCoinChart = async (id) => {
  const res = await axios.get(
    `${API_BASE}/api/coin_chart`, // 서버리스 프록시 함수가 있다면 이 경로, 없으면 아래 참고
    {
      params: {
        id,
        vs_currency: "usd",
        days: 7,
      },
    }
  );
  return res.data; // { prices: [[timestamp, price], ...] }
};
