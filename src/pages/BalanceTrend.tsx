import React, {
  useEffect,
  useState,
} from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

interface Transaction {
  account: string;
  type: string;
  category: string;
  subCategory: string;
  amount: number;
  oldBalance: number;
  newBalance: number;
  reason: string;
  date: string;
  time: string;
}

export default function Reports() {

  const [
    transactions,
    setTransactions,
  ] = useState<Transaction[]>([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(
          "transactions"
        ) || "[]"
      );

    setTransactions(data);

  }, []);

  /* TOTALS */

  const totalIncome =
    transactions
      .filter(
        (t) =>
          t.type === "Income"
      )
      .reduce(
        (a, b) =>
          a + b.amount,
        0
      );

  const totalExpense =
    transactions
      .filter(
        (t) =>
          t.type === "Expense"
      )
      .reduce(
        (a, b) =>
          a + b.amount,
        0
      );

  const netCashFlow =
    totalIncome -
    totalExpense;

  /* CHART DATA */

  const chartData =
    transactions.map((t) => ({
      date: t.date,

      income:
        t.type === "Income"
          ? t.amount
          : 0,

      expense:
        t.type === "Expense"
          ? t.amount
          : 0,

      balance:
        t.newBalance,
    }));

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Financial analytics and reports
        </p>

      </div>

      {/* SUMMARY */}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <p className="text-gray-500 text-sm">
            Total Income
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            ₹ {totalIncome}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <p className="text-gray-500 text-sm">
            Total Expense
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-3">
            ₹ {totalExpense}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <p className="text-gray-500 text-sm">
            Net Cash Flow
          </p>

          <h2
            className={`text-4xl font-bold mt-3 ${
              netCashFlow >= 0
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            ₹ {netCashFlow}
          </h2>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* BAR */}

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Income vs Expense
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={chartData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="income"
                fill="#22c55e"
              />

              <Bar
                dataKey="expense"
                fill="#ef4444"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* LINE */}

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Balance Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={chartData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-100">

          <h2 className="text-2xl font-bold text-gray-800">
            Transaction History
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Account
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Balance
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map(
                (item, index) => (

                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.date}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.account}
                    </td>

                    <td
                      className={`px-6 py-4 font-semibold ${
                        item.type ===
                        "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.type}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {item.category}
                    </td>

                    <td className="px-6 py-4 font-bold">
                      ₹ {item.amount}
                    </td>

                    <td className="px-6 py-4 font-semibold text-blue-600">
                      ₹ {item.newBalance}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}