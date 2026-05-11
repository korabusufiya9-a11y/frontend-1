import React, { useEffect, useState } from "react"
import axios from "axios"

const API = "http://localhost:4000/api/analytics"

export default function AnalyticsPage() {
  const [credit, setCredit] = useState<any>(null)
  const [debit, setDebit] = useState<any>(null)
  const [expense, setExpense] = useState<any>(null)
  const [cashflow, setCashflow] = useState<any>(null)
  const [daily, setDaily] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [budget, setBudget] = useState<any>(null)

  const [budgetInput, setBudgetInput] = useState(0)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      const [c, d, e, cf, da, f] = await Promise.all([
        axios.get(`${API}/credit`),
        axios.get(`${API}/debit`),
        axios.get(`${API}/expense`),
        axios.get(`${API}/cashflow`),
        axios.get(`${API}/daily`),
        axios.get(`${API}/forecast`)
      ])

      setCredit(c.data)
      setDebit(d.data)
      setExpense(e.data)
      setCashflow(cf.data)
      setDaily(da.data)
      setForecast(f.data)
    } catch (err) {
      console.log(err)
    }
  }

  const checkBudget = async () => {
    const res = await axios.post(`${API}/budget`, {
      plannedBudget: budgetInput
    })
    setBudget(res.data)
  }

  const Card = ({ title, value, color }: any) => (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-5 hover:scale-[1.02] transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#f1f5f9] p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500">
          Smart financial insights & predictions
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-5">

        <Card
          title="Total Income"
          value={`₹ ${credit?.totalIncome || 0}`}
          color="text-green-600"
        />

        <Card
          title="Total Expense"
          value={`₹ ${debit?.totalExpense || 0}`}
          color="text-red-500"
        />

        <Card
          title="Daily Average"
          value={`₹ ${daily?.averagePerDay || 0}`}
          color="text-blue-600"
        />
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">

        {/* CATEGORY */}
        <div className="bg-white/70 backdrop-blur-xl border rounded-2xl p-5 shadow-lg">
          <h2 className="font-semibold text-gray-800 mb-3">
            Expense Breakdown
          </h2>

          <div className="space-y-2">
            {expense?.categoryWise &&
              Object.entries(expense.categoryWise).map(
                ([k, v]: any) => (
                  <div
                    key={k}
                    className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg"
                  >
                    <span className="capitalize text-gray-600">
                      {k}
                    </span>
                    <span className="font-semibold">
                      ₹ {v}
                    </span>
                  </div>
                )
              )}
          </div>
        </div>

        {/* CASHFLOW */}
        <div className="bg-white/70 backdrop-blur-xl border rounded-2xl p-5 shadow-lg">
          <h2 className="font-semibold text-gray-800 mb-3">
            Cashflow Insight
          </h2>

          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <p className="text-sm">Lowest Balance</p>
            <h3 className="text-2xl font-bold">
              ₹ {cashflow?.lowestBalanceDay?.balance || 0}
            </h3>
            <p className="text-xs opacity-80">
              {cashflow?.lowestBalanceDay?.date}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">

        {/* FORECAST */}
        <div className="bg-white/70 backdrop-blur-xl border rounded-2xl p-5 shadow-lg">
          <h2 className="font-semibold mb-2">
            Forecast
          </h2>

          <div className="p-4 bg-pink-50 rounded-xl">
            <p className="text-gray-500 text-sm">
              Predicted Expense
            </p>
            <h3 className="text-2xl font-bold text-pink-600">
              ₹ {forecast?.predictedExpense || 0}
            </h3>
          </div>
        </div>

        {/* BUDGET */}
        <div className="bg-white/70 backdrop-blur-xl border rounded-2xl p-5 shadow-lg">
          <h2 className="font-semibold mb-3">
            Budget Control
          </h2>

          <div className="flex gap-2">
            <input
              type="number"
              className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter budget"
              onChange={(e) =>
                setBudgetInput(Number(e.target.value))
              }
            />

            <button
              onClick={checkBudget}
              className="bg-black text-white px-4 rounded-xl hover:bg-gray-800"
            >
              Check
            </button>
          </div>

          {budget && (
            <div className="mt-3 text-sm space-y-1">
              <p>Planned: ₹ {budget.planned}</p>
              <p>Actual: ₹ {budget.actual}</p>
              <p>Difference: ₹ {budget.difference}</p>

              <p
                className={`font-bold ${
                  budget.overspending
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {budget.overspending
                  ? "⚠ Overspending"
                  : "✔ Under Control"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}