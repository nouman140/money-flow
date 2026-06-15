import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const FIREBASE_URL =
  "https://wealthmark-51563-default-rtdb.firebaseio.com/data.json";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(FIREBASE_URL);
      const data = response.data;
      if (data) {
        const transactionsArray = Object.entries(data).map(([id, txn]) => ({
          id,
          ...txn,
          amount: parseFloat(txn.amount),
        }));
        setTransactions(
          transactionsArray.sort((a, b) => new Date(b.date) - new Date(a.date)),
        );
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
      showToast("Failed to load transactions", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post(FIREBASE_URL, transaction);
      const newTransaction = { id: response.data.name, ...transaction };
      setTransactions((prev) => [newTransaction, ...prev]);
      showToast("Transaction added successfully!", "success");
      return true;
    } catch (error) {
      showToast("Failed to add transaction", "error");
      return false;
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      await axios.put(
        `https://wealthmark-51563-default-rtdb.firebaseio.com/data/${id}.json`,
        updatedData,
      );
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t)),
      );
      showToast("Transaction updated!", "success");
      return true;
    } catch (error) {
      showToast("Update failed", "error");
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(
        `https://wealthmark-51563-default-rtdb.firebaseio.com/data/${id}.json`,
      );
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      showToast("Transaction deleted", "info");
      return true;
    } catch (error) {
      showToast("Delete failed", "error");
      return false;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    toast,
    showToast,
  };
};
