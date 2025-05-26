import React, { useState } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CoinDetailPage from "./pages/CoinDetailPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  const handleSelectCoin = (id) => {
    setSelectedCoinId(id);
    setPage("detail");
  };

  return (
    <div>
      <header>
        <button onClick={() => setPage("home")}>홈</button>
        <button onClick={() => setPage("favorites")}>즐겨찾기</button>
      </header>
      <main>
        {/* onSelectCoin 콜백을 통해서 상세 페이지로 이동시킨다. */}
        {page === "home" && <Home onSelectCoin={handleSelectCoin} />}
        {page === "favorites" && <Favorites onSelectCoin={handleSelectCoin} />}
        {page === "detail" && selectedCoinId && (
          <CoinDetailPage
            coinId={selectedCoinId}
            onBack={() => setPage("home")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
