import React, { useEffect, useState } from "react";
import { fetchCoins } from "./api/coingecko";
import CoinTable from "../components/CoinTable";
import useCryptoStore from "../store/useCryptoStore";

function Favorites({ onSelectCoin }) {
  const { favorites } = useCryptoStore();
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState(""); // 검색 상태

  useEffect(() => {
    fetchCoins().then((data) => {
      setCoins(data.filter((c) => favorites.includes(c.id)));
    });
  }, [favorites]);

  // 검색어로 필터링
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">
      <input
        type="text"
        placeholder="코인명 또는 심볼 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "16px 0", padding: "8px", width: "220px" }}
      />
      <CoinTable coins={filteredCoins} onSelect={onSelectCoin} />
    </div>
  );
}

export default Favorites;
