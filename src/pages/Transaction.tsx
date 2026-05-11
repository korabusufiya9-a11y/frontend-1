import React, { useEffect, useState } from "react"

export default function TransactionsPage() {
  const [income, setIncome] = useState<any[]>([])
  const [expense, setExpense] = useState<any[]>([])

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    )

    setIncome(
      saved.filter(
        (item: any) => item.type === "Income"
      )
    )

    setExpense(
      saved.filter(
        (item: any) => item.type === "Expense"
      )
    )
  }, [])

  return (
    <div className="p-6 min-h-screen bg-[#f5f7fb]">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Transactions
        </h1>

        <p className="text-gray-500 mt-2">
          Income & Expense History
        </p>
      </div>

      {/* ---------------- INCOME TABLE ---------------- */}
      <div className="bg-white rounded-2xl shadow mb-8 overflow-hidden">

        <div className="bg-green-50 px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-green-700">
            Income
          </h2>
        </div>

        {income.length === 0 ? (
          <p className="p-6 text-gray-500">
            No Income Found
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">

                  <th className="p-4">
                    Account
                  </th>

                  <th className="p-4">
                    Old Balance
                  </th>

                  <th className="p-4">
                    New Balance
                  </th>

                  <th className="p-4">
                    Amount
                  </th>

                  <th className="p-4">
                    Reason
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                </tr>
              </thead>

              <tbody>
                {income.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      {item.account}
                    </td>

                    <td className="p-4">
                      ₹{item.oldBalance}
                    </td>

                    <td className="p-4">
                      ₹{item.newBalance}
                    </td>

                    <td className="p-4 font-bold text-green-600">
                      ₹ {item.amount}
                    </td>

                    <td className="p-4">
                      {item.reason}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {item.date} • {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* ---------------- EXPENSE TABLE ---------------- */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="bg-red-50 px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-red-700">
            Expenses
          </h2>
        </div>

        {expense.length === 0 ? (
          <p className="p-6 text-gray-500">
            No Expenses Found
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">

                  <th className="p-4">
                    Account
                  </th>

                  <th className="p-4">
                    Old Balance
                  </th>

                  <th className="p-4">
                    New Balance
                  </th>

                  <th className="p-4">
                    Amount
                  </th>

                  <th className="p-4">
                    Reason
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                </tr>
              </thead>

              <tbody>
                {expense.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      {item.account}
                    </td>

                    <td className="p-4">
                      ₹{item.oldBalance}
                    </td>

                    <td className="p-4">
                      ₹{item.newBalance}
                    </td>

                    <td className="p-4 font-bold text-red-600">
                      ₹ {item.amount}
                    </td>

                    <td className="p-4">
                      {item.reason}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {item.date} • {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  )
}