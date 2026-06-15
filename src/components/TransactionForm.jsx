import React, { useState, useEffect } from "react";

const TransactionForm = ({ onSubmit, editingTxn, setEditingTxn }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTxn) {
      setFormData({
        description: editingTxn.description,
        amount: editingTxn.amount,
        category: editingTxn.category,
        type: editingTxn.type,
        date: editingTxn.date,
      });
    } else {
      resetForm();
    }
  }, [editingTxn]);

  const resetForm = () => {
    setFormData({
      description: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (isNaN(formData.amount)) newErrors.amount = "Amount must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    resetForm();
    if (editingTxn) setEditingTxn(null);
  };

  return (
    <>
      <h1 className={`text-3xl font-bold text-black dark:text-white`}>
        Transactions
      </h1>
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 text-black dark:text-gray-400">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <i className="fas fa-plus-circle text-indigo-500"></i>
          {editingTxn ? "Edit Transaction" : "Add Transaction"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          <div className="">
            <input
              type="text"
              placeholder="Description *"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`outline-none w-full p-2 border rounded-lg dark:bg-gray-700 ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Amount *"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className={`outline-none w-full p-2 border rounded-lg dark:bg-gray-700 ${errors.amount ? "border-red-500" : ""}`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="p-2 border rounded-lg dark:bg-gray-700"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
          </select>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="p-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="p-2 border rounded-lg dark:bg-gray-700"
          />
          <div className=" flex gap-3">
            <button
              type="submit"
              className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition"
            >
              <i className="fas fa-save"></i> {editingTxn ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TransactionForm;
