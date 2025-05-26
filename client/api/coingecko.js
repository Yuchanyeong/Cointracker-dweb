import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

// 여러 코인의 리스트를 가져오는 함수
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

//특정 코인의 상세 정보를 받아오는 함수
export const fetchCoinDetail = async (id) => {
  const res = await axios.get(`${API_BASE}/api/coin`, {
    params: { id },
  });
  return res.data;
};

// 특정 코인의 7일 그래프 데이터를 받아오는 함수
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
  return res.data;
};
