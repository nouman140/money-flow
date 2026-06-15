export const exportToCSV = (transactions) => {
  const headers = ["Description", "Amount", "Category", "Type", "Date"];
  const rows = transactions.map((t) => [
    t.description,
    t.amount,
    t.category,
    t.type,
    new Date(t.date).toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
