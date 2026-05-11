import React, { useEffect, useMemo, useState } from "react"

interface Transaction {
  _id?: string
  account: string
  category: string
  amount: number
  reason: string
  date: string
  time: string
  type: "Income" | "Expense"
  oldBalance?: number
  newBalance?: number
}

export default function RecordsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const [form, setForm] = useState<Transaction>({
    account: "",
    category: "",
    amount: 0,
    reason: "",
    date: "",
    time: "",
    type: "Expense",
  })

  /* ================= LOAD ================= */
  const loadTransactions = () => {
    const saved = JSON.parse(localStorage.getItem("transactions") || "[]")
    setTransactions(saved)
  }

  useEffect(() => {
    loadTransactions()

    const handler = () => loadTransactions()

    window.addEventListener("transactionsUpdated", handler)
    window.addEventListener("storage", handler)

    return () => {
      window.removeEventListener("transactionsUpdated", handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  /* ================= OPEN ADD ================= */
  const openAdd = () => {
    setForm({
      account: "",
      category: "",
      amount: 0,
      reason: "",
      date: "",
      time: "",
      type: "Expense",
    })
    setEditId(null)
    setShowModal(true)
  }

  /* ================= OPEN EDIT ================= */
  const openEdit = (item: Transaction) => {
    setForm(item)
    setEditId(item._id || null)
    setShowModal(true)
  }

  /* ================= SAVE (ADD + EDIT) ================= */
  const saveTransaction = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]")

    const selectedAccount = accounts.find(
      (acc: any) => acc.accountName === form.account
    )

    const oldBalance = selectedAccount?.balance || 0

    const newBalance =
      form.type === "Income"
        ? oldBalance + Number(form.amount)
        : oldBalance - Number(form.amount)

    const updatedAccounts = accounts.map((acc: any) =>
      acc.accountName === form.account
        ? { ...acc, balance: newBalance }
        : acc
    )

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts))

    let updated = [...transactions]

    const data: Transaction = {
      ...form,
      oldBalance,
      newBalance,
      _id: editId || Date.now().toString(),
    }

    if (editId) {
      updated = updated.map((t) =>
        t._id === editId ? data : t
      )
    } else {
      updated.unshift(data)
    }

    setTransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))

    window.dispatchEvent(new Event("transactionsUpdated"))

    setShowModal(false)
    setEditId(null)
  }

  /* ================= DELETE ================= */
  const deleteTransaction = (id?: string) => {
    const updated = transactions.filter((item) => item._id !== id)

    setTransactions(updated)
    localStorage.setItem("transactions", JSON.stringify(updated))

    window.dispatchEvent(new Event("transactionsUpdated"))
  }

  /* ================= FILTER ================= */
  const filtered = transactions.filter((item) => {
    const matchSearch = `
      ${item.account}
      ${item.category}
      ${item.reason}
    `.toLowerCase().includes(search.toLowerCase())

    if (filter === "All") return matchSearch
    return item.type === filter && matchSearch
  })

  /* ================= ANALYTICS ================= */
  const analytics = useMemo(() => {
    const income = transactions
      .filter((x) => x.type === "Income")
      .reduce((a, b) => a + b.amount, 0)

    const expense = transactions
      .filter((x) => x.type === "Expense")
      .reduce((a, b) => a + b.amount, 0)

    return {
      income,
      expense,
      total: income - expense,
    }
  }, [transactions])

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl mb-6">
        <h1 className="text-3xl font-bold">Records</h1>

        <button
          onClick={openAdd}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          + Add Record
        </button>
      </div>

      {/* ANALYTICS */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl">Total ₹{analytics.total}</div>
        <div className="bg-white p-5 rounded-2xl text-green-600">Income ₹{analytics.income}</div>
        <div className="bg-white p-5 rounded-2xl text-red-500">Expense ₹{analytics.expense}</div>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {filtered.map((item) => (

          <div key={item._id} className="bg-white p-5 rounded-2xl border">

            <div className="flex justify-between">

              <div>
                <h2 className="font-bold">{item.category}</h2>
                <p>{item.reason}</p>
                <p className="text-blue-600">🏦 {item.account}</p>
                <p className="text-xs text-gray-400">{item.date} {item.time}</p>
              </div>

              <div className="text-right">
                <p className={item.type === "Income" ? "text-green-600" : "text-red-500"}>
                  {item.type === "Income" ? "+" : "-"} ₹{item.amount}
                </p>
              </div>

            </div>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() => openEdit(item)}
                className="px-4 py-2 bg-gray-100 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTransaction(item._id)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* MODAL (ADD / EDIT) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Record" : "Add Record"}
            </h2>

            <input
              placeholder="Account"
              value={form.account}
              onChange={(e) => setForm({ ...form, account: e.target.value })}
              className="w-full border p-2 mb-2"
            />

            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border p-2 mb-2"
            />

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              className="w-full border p-2 mb-2"
            />

            <input
              placeholder="Reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full border p-2 mb-2"
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as "Income" | "Expense" })
              }
              className="w-full border p-2 mb-2"
            >
              <option>Income</option>
              <option>Expense</option>
            </select>

            <div className="flex gap-2 mt-3">

              <button onClick={() => setShowModal(false)} className="w-full border p-2">
                Cancel
              </button>

              <button onClick={saveTransaction} className="w-full bg-black text-white p-2">
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}