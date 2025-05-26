import FavoriteButton from "./FavoriteButton";
import { Line } from "react-chartjs-2";

function Sparkline({ data }) {
  return (
    <div className="sparkline-cell">
      <Line
        data={{
          labels: data.map((_, i) => i),
          datasets: [
            {
              data,
              borderColor: "#4caf50",
              backgroundColor: "rgba(76,175,80,0.08)",
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.3,
            },
          ],
        }}
        options={{
          plugins: { legend: { display: false } },
          scales: { x: { display: false }, y: { display: false } },
          elements: { line: { borderJoinStyle: "round" } },
          responsive: false,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default function CoinTable({ coins, onSelect }) {
  return (
    <table>
      <thead>
        <tr>
          <th>★</th>
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>24h Volume</th>
          <th>Mkt Cap</th>
          <th>Last 7 Days</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr
            key={coin.id}
            onClick={() => onSelect(coin.id)}
            style={{ cursor: "pointer" }}
          >
            <td>
              <FavoriteButton coinId={coin.id} />
            </td>
            <td>{coin.market_cap_rank}</td>
            <td>
              <div className="coin-info">
                <img src={coin.image} alt={coin.symbol} />
                <b>{coin.name}</b>
                <span style={{ color: "#888" }}>
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
            </td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td
              className={
                coin.price_change_percentage_1h_in_currency > 0
                  ? "positive"
                  : "negative"
              }
            >
              {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
            </td>
            <td
              className={
                coin.price_change_percentage_24h_in_currency > 0
                  ? "positive"
                  : "negative"
              }
            >
              {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
            </td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>
              {coin.sparkline_in_7d && coin.sparkline_in_7d.price && (
                <Sparkline data={coin.sparkline_in_7d.price} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
