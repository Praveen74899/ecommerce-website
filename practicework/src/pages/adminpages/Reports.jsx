// ReportSection.jsx
import React, { useMemo, useState } from "react";

/**
 * Dummy Report Section (Tailwind)
 * - Copy this component into your React app
 * - Make sure Tailwind is configured
 */

const DUMMY_DATA = Array.from({ length: 23 }).map((_, i) => ({
  id: `ORD-${1000 + i}`,
  product: ["Shirt", "Jeans", "Shoes", "Watch"][i % 4],
  customer: ["Praveen", "Amit", "Sneha", "Riya"][i % 4],
  amount: (Math.floor(Math.random() * 900) + 100).toFixed(0),
  status: ["Delivered", "Pending", "Cancelled"][i % 3],
  date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0], // last i days
}));

export default function ReportSection() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 6;

  // Derived / filtered data
  const filtered = useMemo(() => {
    return DUMMY_DATA.filter((row) => {
      if (statusFilter && row.status !== statusFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !row.product.toLowerCase().includes(q) &&
          !row.customer.toLowerCase().includes(q) &&
          !row.id.toLowerCase().includes(q)
        )
          return false;
      }
      if (fromDate && row.date < fromDate) return false;
      if (toDate && row.date > toDate) return false;
      return true;
    });
  }, [query, statusFilter, fromDate, toDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  // Summary values (dummy)
  const summary = {
    totalOrders: DUMMY_DATA.length,
    totalSales: DUMMY_DATA.reduce((s, r) => s + Number(r.amount), 0),
    delivered: DUMMY_DATA.filter((r) => r.status === "Delivered").length,
    pending: DUMMY_DATA.filter((r) => r.status === "Pending").length,
  };

  // CSV export
  const exportCSV = () => {
    const headers = ["Order ID", "Product", "Customer", "Amount", "Status", "Date"];
    const rows = filtered.map((r) => [r.id, r.product, r.customer, r.amount, r.status, r.date]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // small helpers
  const resetFilters = () => {
    setQuery("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return (
     <div className="p-6 bg-[#F7F3EF] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Reports</h1>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Export CSV
            </button>
            <button
              onClick={resetFilters}
              className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:shadow"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="Total Orders" value={summary.totalOrders} />
          <Card title="Total Sales" value={`₹${summary.totalSales}`} />
          <Card title="Delivered" value={summary.delivered} />
          <Card title="Pending" value={summary.pending} />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order / product / customer"
              className="border p-2 rounded-lg w-full"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded-lg w-full"
            >
              <option value="">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                pageData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{row.id}</td>
                    <td className="px-4 py-3 text-sm">{row.product}</td>
                    <td className="px-4 py-3 text-sm">{row.customer}</td>
                    <td className="px-4 py-3 text-sm">₹{row.amount}</td>
                    <td className="px-4 py-3 text-sm">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-sm">{row.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing <strong>{(page - 1) * perPage + 1}</strong> to{" "}
              <strong>{Math.min(page * perPage, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong> entries
            </div>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
              >
                Prev
              </button>
              <div className="px-3 py-1 rounded border bg-white">
                Page {page} / {totalPages}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded border bg-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-xs text-gray-500 mt-4">
          Dummy report — replace DUMMY_DATA with your API response and wire filters to backend for real data.
        </p>
      </div>
    </div>
  );
}

/* Small presentational components */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const bg =
    status === "Delivered" ? "bg-green-100 text-green-700" :
    status === "Pending" ? "bg-yellow-100 text-yellow-700" :
    "bg-red-100 text-red-700";

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bg}`}>{status}</span>;
}
