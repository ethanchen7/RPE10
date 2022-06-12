import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VolumeChart = ({ weeks }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Volume per Week",
      },
    },
  };

  const labels = weeks.map((week, idx) => `Week ${idx + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Average Volume",
        data: weeks.map((week) => (week.avg_vol / 100).toFixed(1)),
        backgroundColor: ["#03dac5"],
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default VolumeChart;
