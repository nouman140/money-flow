import React from "react";

const Filters = ({ filters, setFilters, onExport }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-400 rounded-2xl shadow-sm p-4 mb-6 flex flex-col ">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <i className="fa-solid fa-filter-circle-xmark text-indigo-500"></i>
          Filters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
          <div className="flex-1 min-w-35">
            <input
              type="text"
              placeholder="Search by Title"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 outline-none"
            />
          </div>
          <div className="">
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value, page: 1 })
              }
              className="p-2 border rounded-lg dark:bg-gray-700 w-full"
            >
              <option value="all">All Categories</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
            </select>
          </div>
          <div>
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value, page: 1 })
              }
              className="p-2 border rounded-lg dark:bg-gray-700 w-full"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="p-2 border rounded-lg dark:bg-gray-700 w-full"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
          <button
            onClick={onExport}
            className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
          >
            <i className="fas fa-download"></i> Export CSV
          </button>
        </div>
      </div>
    </>
  );
};

export default Filters;
