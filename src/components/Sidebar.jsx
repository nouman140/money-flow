import React, { useEffect } from "react";

const Sidebar = ({ darkMode, setDarkMode, setActive, active }) => {
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <aside className="w-20 md:w-64 bg-white dark:bg-gray-800 shadow-xl z-10 flex flex-col transition-all duration-300">
      <div className="p-5 flex items-center justify-center md:justify-start gap-3 border-b border-gray-200 dark:border-gray-700">
        <i className="fas fa-chart-line text-2xl text-indigo-600 dark:text-indigo-400"></i>
        <span className="hidden md:block font-bold text-xl tracking-tight text-black dark:text-white">
          MoneyFlow
        </span>
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
        <button
          className={`${active === "dashboard" ? "currentPage" : ""} flex items-center gap-3 p-3 rounded-xl cursor-pointer text-indigo-700 dark:text-gray-400`}
          onClick={() => setActive("dashboard")}
        >
          <i className="fas fa-tachometer-alt w-5 text-blue-600"></i>
          <span className="hidden md:inline font-medium">Dashboard</span>
        </button>
        <button
          className={`${active === "transaction" ? "currentPage" : ""} flex items-center gap-3 p-3 rounded-xl text-indigo-700 dark:text-gray-400  cursor-pointer`}
          onClick={() => setActive("transaction")}
        >
          <i className="fas fa-exchange-alt w-5 text-blue-600"></i>
          <span className="hidden md:inline">Transactions</span>
        </button>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center md:justify-between items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 w-9 h-9 flex items-center justify-center hover:scale-110 transition"
        >
          <i
            className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-gray-700 dark:text-yellow-300`}
          ></i>
        </button>
        {/* <span className="hidden md:text-xs text-gray-400">Secure Sync</span> */}
      </div>
    </aside>
  );
};

export default Sidebar;
