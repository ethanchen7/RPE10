import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RPEChart = ({ weeks }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average RPE per Week",
      },
    },
  };
  const labels = weeks.map((week, idx) => `Week ${idx + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Average RPE",
        data: weeks.map((week) => Math.floor(week.avg_rpe)),
        backgroundColor: ["#fff"],
        borderColor: ["#03dac5"],
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default RPEChart;
