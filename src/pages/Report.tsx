import React, {
  useEffect,
  useMemo,
  useState,
} from "react"

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
  AreaChart,
  Area,
} from "recharts"

interface Transaction {
  date?: string
  Date?: string
  account: string
  type: string
  note?: string
  reason?: string
  amount: number
  income?: number
  expense?: number
  netBalance?: number
  category?: string
}

export default function Reports() {

  const [
    transactionDetails,
    setTransactionDetails,
  ] = useState<Transaction[]>(
    []
  )

  /* ================= LOAD RECORDS ================= */

  useEffect(() => {

    const savedTransactions =
      JSON.parse(
        localStorage.getItem(
          "transactions"
        ) || "[]"
      )

    setTransactionDetails(
      savedTransactions
    )

  }, [])

  /* ================= SUMMARY ================= */

  const summary = useMemo(() => {

    const totalIncome =
      transactionDetails.reduce(
        (acc, item) =>
          acc +
          (
            item.type ===
            "Income"
              ? Number(
                  item.amount
                )
              : 0
          ),
        0
      )

    const totalExpense =
      transactionDetails.reduce(
        (acc, item) =>
          acc +
          (
            item.type ===
            "Expense"
              ? Number(
                  item.amount
                )
              : 0
          ),
        0
      )

    return {
      totalIncome,
      totalExpense,
      totalTransactions:
        transactionDetails.length,
      netCashFlow:
        totalIncome -
        totalExpense,
    }

  }, [transactionDetails])

  /* ================= CHART DATA ================= */

  const chartData = useMemo(() => {

    let runningBalance = 0

    return transactionDetails
      .slice()
      .reverse()
      .map((item) => {

        const income =
          item.type ===
          "Income"
            ? Number(
                item.amount
              )
            : 0

        const expense =
          item.type ===
          "Expense"
            ? Number(
                item.amount
              )
            : 0

        runningBalance +=
          income - expense

        return {
          date:
            item.date ||
            item.Date ||
            "N/A",

          income,
          expense,

          balance:
            runningBalance,
        }
      })

  }, [transactionDetails])

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Financial Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Professional overview of your income,
          expenses and transactions.
        </p>

      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* INCOME */}

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Income
              </p>

              <h2 className="text-4xl font-bold text-emerald-600 mt-3">
                ₹
                {summary.totalIncome.toLocaleString()}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl">
              💰
            </div>

          </div>

        </div>

        {/* EXPENSE */}

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Expense
              </p>

              <h2 className="text-4xl font-bold text-red-500 mt-3">
                ₹
                {summary.totalExpense.toLocaleString()}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
              💸
            </div>

          </div>

        </div>

        {/* CASH FLOW */}

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Net Cash Flow
              </p>

              <h2
                className={`text-4xl font-bold mt-3 ${
                  summary.netCashFlow >= 0
                    ? "text-blue-600"
                    : "text-red-500"
                }`}
              >
                ₹
                {summary.netCashFlow.toLocaleString()}
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
              📈
            </div>

          </div>

        </div>

        {/* TRANSACTIONS */}

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Transactions
              </p>

              <h2 className="text-4xl font-bold text-violet-600 mt-3">
                {
                  summary.totalTransactions
                }
              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-2xl">
              📑
            </div>

          </div>

        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid xl:grid-cols-2 gap-6 mb-8">

        {/* BAR CHART */}

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-gray-800">
              Income vs Expense
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Compare daily income and expenses
            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
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
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey="expense"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* LINE CHART */}

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-gray-800">
              Balance Trend
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Running balance overview
            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <AreaChart
              data={chartData}
            >

              <defs>

                <linearGradient
                  id="colorBalance"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#2563eb"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563eb"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorBalance)"
                strokeWidth={3}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= TRANSACTION TABLE ================= */}

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-gray-100">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Transaction Records
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete income and expense history
            </p>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#f8fafc]">

              <tr>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Account
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Note
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {transactionDetails.length > 0 ? (

                transactionDetails.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-t border-gray-100 hover:bg-[#f9fafb] transition"
                    >

                      <td className="p-5 text-gray-700">
                        {
                          item.date ||
                          item.Date
                        }
                      </td>

                      <td className="p-5 font-medium text-gray-800">
                        {
                          item.account
                        }
                      </td>

                      <td className="p-5">

                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                            item.type ===
                            "Income"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {
                            item.type
                          }
                        </span>

                      </td>

                      <td className="p-5 text-gray-700">
                        {
                          item.category ||
                          "General"
                        }
                      </td>

                      <td className="p-5 text-gray-600">
                        {
                          item.note ||
                          item.reason ||
                          "-"
                        }
                      </td>

                      <td
                        className={`p-5 font-bold ${
                          item.type ===
                          "Income"
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >

                        {item.type ===
                        "Income"
                          ? "+ "
                          : "- "}

                        ₹
                        {Number(
                          item.amount
                        ).toLocaleString()}

                      </td>

                    </tr>
                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-16 text-gray-400"
                  >
                    No transaction records found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}