import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import DashboardStats from "./components/DashboardStats";
import Charts from "./components/Charts";
import Filters from "./components/Filters";
import TransactionList from "./components/TransactionList";
import List from "./components/list";
import TransactionForm from "./components/TransactionForm";
import Toast from "./components/Toast";
import { useTransactions } from "./hooks/useTransactions";
import { exportToCSV } from "./utils/exportCSV";

function App() {
  const [active, setActive] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    type: "all",
    sort: "latest",
    page: 1,
  });
  const [editingTxn, setEditingTxn] = useState(null);
  const {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    toast,
  } = useTransactions();

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (filters.search) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.type !== "all") {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    switch (filters.sort) {
      case "highest":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "lowest":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [transactions, filters]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage,
  );

  const handleSubmit = async (txnData) => {
    if (editingTxn) {
      await updateTransaction(editingTxn.id, txnData);
      setEditingTxn(null);
    } else {
      await addTransaction(txnData);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await deleteTransaction(id);
    }
  };

  const handleExport = () => {
    exportToCSV(filteredTransactions);
  };

  return (
    <section className="flex h-screen overflow-hidden">
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        active={active}
        setActive={setActive}
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
        {active === "dashboard" && (
          <>
            <DashboardStats transactions={transactions} />
            <Charts transactions={transactions} />
          </>
        )}
        {active === "transaction" && (
          <>
            <TransactionForm
              onSubmit={handleSubmit}
              editingTxn={editingTxn}
              setEditingTxn={setEditingTxn}
            />
            <br />
            <Filters
              filters={filters}
              setFilters={setFilters}
              onExport={handleExport}
            />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-lg text-black dark:text-gray-400">
                  <i className="fas fa-history mr-2 text-indigo-500"></i>
                  Transactions
                </h3>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {filteredTransactions.length} total
                </span>
              </div>

              <TransactionList
                transactions={paginatedTransactions}
                onEdit={(txn) => {
                  setEditingTxn(txn);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onDelete={handleDelete}
                loading={loading}
              />

              {filteredTransactions.length > 0 && (
                <div className="p-4 border-t dark:border-gray-700 flex justify-between items-center">
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        page: Math.max(1, filters.page - 1),
                      })
                    }
                    disabled={filters.page === 1}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <i className="fas fa-chevron-left"></i> Previous
                  </button>
                  <span className="text-sm">
                    Page {filters.page} of {totalPages || 1}
                  </span>
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        page: Math.min(totalPages, filters.page + 1),
                      })
                    }
                    disabled={filters.page === totalPages || totalPages === 0}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Next <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </section>
  );
}

export default App;
