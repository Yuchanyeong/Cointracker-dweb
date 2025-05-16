import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function CoinLargeChart({ prices }) {
  // prices: [[timestamp, price], ...]
  const data = {
    labels: prices.map(([ts]) => new Date(ts).toLocaleDateString()),
    datasets: [
      {
        label: "가격(USD)",
        data: prices.map(([_, price]) => price),
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.08)",
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 부모 div 크기에 맞춤
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { display: true, ticks: { color: "#888" } },
      y: { display: true, ticks: { color: "#888" } },
    },
  };

  return (
    <div style={{ width: "100%", height: "320px", margin: "32px 0" }}>
      <Line data={data} options={options} />
    </div>
  );
}
