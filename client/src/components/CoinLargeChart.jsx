import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function CoinLargeChart({ prices }) {
  if (!prices || !Array.isArray(prices) || prices.length === 0) {
    return <div>차트 데이터가 없습니다.</div>;
  }

  const data = {
    labels: prices.map(([ts]) => new Date(ts).toLocaleDateString()),
    datasets: [
      {
        label: "가격(USD)",
        data: prices.map(([, price]) => price),
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
    maintainAspectRatio: false,
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
    <div className="large-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
}
