import React from "react";

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <i className="fas fa-spinner fa-spin text-2xl"></i>
        <p>Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center">
        <i className="fas fa-receipt text-4xl text-gray-400 mb-3"></i>
        <p className="text-gray-500">
          No transactions found. Add your first transaction!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {transactions.map((txn) => (
            <tr
              key={txn.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {/* Type Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    txn.type === "income"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  <i
                    className={`fas ${
                      txn.type === "income"
                        ? "fa-arrow-up text-green-600"
                        : "fa-arrow-down text-red-600"
                    }`}
                  ></i>
                </div>
              </td>

              {/* Description Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="font-semibold">{txn.description}</p>
              </td>

              {/* Category Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800">
                  {txn.category}
                </span>
              </td>

              {/* Date Column */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(txn.date).toLocaleDateString()}
              </td>

              {/* Amount Column */}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <p
                  className={`font-bold ${
                    txn.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {txn.amount}rs
                </p>
              </td>

              {/* Actions Column */}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onEdit(txn)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => onDelete(txn.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
