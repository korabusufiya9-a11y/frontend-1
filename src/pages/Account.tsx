import React, { useEffect, useState } from "react"
import axios from "axios"

const API_URL = "http://localhost:4000/api/accounts"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const [editId, setEditId] = useState("")

  const [name, setName] = useState("")
  const [type, setType] = useState("savings")
  const [currency, setCurrency] = useState("INR")
  const [balance, setBalance] = useState("")

  /* FETCH */
  const fetchAccounts = async () => {
    const res = await axios.get(API_URL)
    setAccounts(res.data)
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  /* ADD */
  const addAccount = async () => {
    await axios.post(API_URL, {
      userId: "69f06a51cd7d1d1460809f0a",
      accountName: name,
      accountType: type,
      currency,
      balance: Number(balance),
    })

    closeModal()
    fetchAccounts()
  }

  /* DELETE */
  const deleteAccount = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`)
    fetchAccounts()
  }

  /* EDIT */
  const openEdit = (acc: any) => {
    setEditId(acc._id)
    setName(acc.accountName || acc.name)
    setType(acc.accountType || acc.type)
    setCurrency(acc.currency)
    setBalance(acc.balance.toString())
    setShowEdit(true)
  }

  /* UPDATE */
  const updateAccount = async () => {
    await axios.put(`${API_URL}/${editId}`, {
      accountName: name,
      accountType: type,
      currency,
      balance: Number(balance),
    })

    closeModal()
    fetchAccounts()
  }

  /* CLOSE */
  const closeModal = () => {
    setShowAdd(false)
    setShowEdit(false)
    setEditId("")
    setName("")
    setType("savings")
    setCurrency("INR")
    setBalance("")
  }

  /* STYLE */
  const getTypeStyle = (type: string) => {
    switch (type) {
      case "savings":
        return "bg-emerald-100 text-emerald-700"
      case "credit":
        return "bg-red-100 text-red-600"
      case "investment":
        return "bg-violet-100 text-violet-700"
      case "loan":
        return "bg-orange-100 text-orange-700"
      case "fixed_deposit":
        return "bg-blue-100 text-blue-700"
      case "wallet":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Accounts</h1>
          <p className="text-gray-500">Manage your financial accounts</p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md"
        >
          + Add Account
        </button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500">Total Accounts</p>
          <h2 className="text-3xl font-bold">{accounts.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500">Savings</p>
          <h2 className="text-3xl font-bold text-emerald-600">
            {accounts.filter(x => (x.accountType || x.type) === "savings").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500">Credit</p>
          <h2 className="text-3xl font-bold text-red-500">
            {accounts.filter(x => (x.accountType || x.type) === "credit").length}
          </h2>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Account</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Currency</th>
              <th className="p-4 text-left">Balance</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((acc) => (
              <tr key={acc._id} className="border-t hover:bg-gray-50">

                <td className="p-4 font-semibold">
                  {acc.accountName || acc.name}
                </td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeStyle(acc.accountType || acc.type)}`}>
                    {acc.accountType || acc.type}
                  </span>
                </td>

                <td className="p-4">{acc.currency}</td>

                <td className="p-4 font-bold text-gray-800">
                  ₹ {acc.balance}
                </td>

                <td className="p-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openEdit(acc)}
                    className="px-3 py-1 bg-gray-100 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteAccount(acc._id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {(showAdd || showEdit) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[380px] shadow-2xl">

            <h2 className="text-2xl font-bold mb-4">
              {showEdit ? "Edit Account" : "Add Account"}
            </h2>

            <input
              className="w-full border p-2 mb-3 rounded-lg"
              placeholder="Account Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* MORE OPTIONS ADDED HERE 👇 */}
            <select
              className="w-full border p-2 mb-3 rounded-lg"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="savings">Savings</option>
              <option value="credit">Credit</option>
              <option value="investment">Investment</option>
              <option value="loan">Loan</option>
              <option value="fixed_deposit">Fixed Deposit</option>
              <option value="wallet">Wallet</option>
              <option value="current">Current Account</option>
              <option value="crypto">Crypto Wallet</option>
            </select>

            <input
              className="w-full border p-2 mb-3 rounded-lg"
              placeholder="Currency (INR, USD...)"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-4 rounded-lg"
              placeholder="Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="w-full bg-gray-200 p-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={showEdit ? updateAccount : addAccount}
                className="w-full bg-blue-600 text-white p-2 rounded-lg"
              >
                {showEdit ? "Update" : "Save"}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}