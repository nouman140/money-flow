import React, { useMemo } from "react";

const DashboardStats = ({ transactions }) => {
  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  return (
    <>
      <h1 className={`text-3xl font-bold text-black dark:text-white mb-5`}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 transition hover:shadow-lg">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Total Balance
            </span>
            <i className="fas fa-wallet text-indigo-500"></i>
          </div>
          <p className="text-3xl font-bold mt-2 text-black dark:text-gray-400">
            {stats.balance}rs
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 transition hover:shadow-lg">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Total Income
            </span>
            <i className="fas fa-arrow-up text-green-500"></i>
          </div>
          <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">
            {stats.totalIncome}rs
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 transition hover:shadow-lg">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Total Expenses
            </span>
            <i className="fas fa-arrow-down text-red-500"></i>
          </div>
          <p className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">
            {stats.totalExpense}rs
          </p>
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
