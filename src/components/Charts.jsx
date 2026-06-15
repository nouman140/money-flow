import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const Charts = ({ transactions }) => {
  const monthlyData = useMemo(() => {
    const months = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        const month = new Date(t.date).toLocaleString("default", {
          month: "short",
        });
        months[month] = (months[month] || 0) + t.amount;
      }
    });
    return {
      labels: Object.keys(months),
      datasets: [
        {
          label: "Monthly Expenses",
          data: Object.values(months),
          backgroundColor: "rgba(99, 102, 241, 0.6)",
          borderColor: "rgb(99, 102, 241)",
          borderWidth: 1,
        },
      ],
    };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2 text-black dark:text-gray-400">
          <i className="fas fa-chart-line mr-2 "></i> Monthly Expense Trend
        </h3>
        <Bar
          data={monthlyData}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2 text-black dark:text-gray-400">
          <i className="fas fa-pie-chart mr-2 "></i> Category Spending
        </h3>
        <Pie
          data={categoryData}
          options={{ responsive: true, maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
};

export default Charts;
