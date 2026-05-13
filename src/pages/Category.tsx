import React, {
  useEffect,
  useMemo,
  useState,
} from "react"

import axios from "axios"

const CATEGORY_DATA: Record<string, string[]> = {
  Transportation: [
    "Transportation",
    "Business Trips",
    "Taxi",
    "Public Transport",
  ],

  Vehicle: [
    "Vehicle",
    "Fuel",
    "Parking",
    "Rentals",
    "Vehicle Insurance",
    "Vehicle Maintenance",
  ],

  "Life & Entertainment": [
    "Life & Entertainment",
    "Holiday",
    "TV & Streaming",
    "Books",
    "Education",
    "Hobbies",
    "Fitness",
    "Health Care",
  ],

  "Communication & PC": [
    "Communication & PC",
    "Internet",
    "Telephone",
    "Software",
    "Apps",
    "Games",
  ],

  "Finance Expenses": [
    "Finance Expenses",
    "Charges",
    "Fines",
    "Loans",
    "Insurance",
    "Taxes",
  ],

  Investment: [
    "Investment",
    "Savings",
    "Financial Investments",
    "Realty",
  ],

  Other: ["Others", "Missing"],

  Unknown: ["Unknown Expense", "Unknown Income"],
}
interface Category {
  _id: string
  name: string
  subCategory: string
  masterCategory: string
  iconcolor: string
}

interface Transaction {
  account: string
  type: "Income" | "Expense"
  category: string
  subCategory: string
  amount: number
  reason: string
  date: string
  time: string
}

const API_URL =
  "http://localhost:4000/api/categories"

export default function CategoryPage() {

  const [categories, setCategories] =
    useState<Category[]>([])

  const [transactions, setTransactions] =
    useState<Transaction[]>(([]))

  const [showModal, setShowModal] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [search, setSearch] =
    useState("")

  const [filter, setFilter] =
    useState("All")

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null)

  const [form, setForm] = useState({
  name: "",
  subCategory: "",
  customSubCategory: "",
  masterCategory: "Income",
  iconcolor: "#6366f1",
})
  /* ================= LOAD ================= */

  const loadCategories = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/getAll`
      )

      setCategories(res.data)

    } catch (error) {

      console.log(error)
    }
  }
const subCategories =
  CATEGORY_DATA[form.masterCategory] || []
  useEffect(() => {

    loadCategories()

    const saved =
      JSON.parse(
        localStorage.getItem(
          "transactions"
        ) || "[]"
      )

    setTransactions(saved)

  }, [])

  /* ================= CREATE ================= */

  const handleCreate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      await axios.post(
        `${API_URL}/create`,
        {
          name: form.name,
          subCategory:
  form.customSubCategory ||
  form.subCategory,
          masterCategory:
            form.masterCategory,
          iconcolor:
            form.iconcolor,
          userId:
            "69f06a51cd7d1d1460809f0a",
        }
      )

      setForm({
       name: "",
       subCategory: "",
       customSubCategory: "",
       masterCategory: "Income",
       iconcolor: "#6366f1",
})
      setShowModal(false)

      loadCategories()

    } catch (error) {

      console.log(error)

      alert("Failed")

    } finally {

      setLoading(false)
    }
  }

  /* ================= DELETE ================= */

  const handleDelete = async (
    id: string
  ) => {

    try {

      await axios.delete(
        `${API_URL}/delete/${id}`
      )

      loadCategories()

    } catch (error) {

      console.log(error)
    }
  }

  /* ================= FILTER ================= */

  const filteredCategories =
    categories.filter((item) => {

      const matchesSearch =
        `
        ${item.name}
        ${item.subCategory}
        ${item.masterCategory}
      `
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      if (filter === "All")
        return matchesSearch

      return (
        item.masterCategory ===
          filter && matchesSearch
      )
    })

  /* ================= ANALYTICS ================= */

  const analytics = useMemo(() => {

    const income =
      transactions
        .filter(
          (x) =>
            x.type === "Income"
        )
        .reduce(
          (a, b) =>
            a + b.amount,
          0
        )

    const expense =
      transactions
        .filter(
          (x) =>
            x.type ===
            "Expense"
        )
        .reduce(
          (a, b) =>
            a + b.amount,
          0
        )

    return {
      income,
      expense,
    }

  }, [transactions])

  return (

    <div className="min-h-screen bg-[#f4f6fb] p-6">

      {/* TOPBAR */}

      <div className="bg-white rounded-3xl border border-gray-100 px-6 py-5 mb-6 shadow-sm">

        <div className="flex items-center justify-between">

          {/* LEFT */}

          <div>

            <h1 className="text-2xl font-semibold text-gray-800">
              Categories
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Organize your spending categories
            </p>

          </div>

          {/* RIGHT */}

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 rounded-2xl text-sm transition"
          >
            + New Category
          </button>

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">

          <p className="text-sm text-gray-400">
            Total Categories
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            {categories.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">

          <p className="text-sm text-gray-400">
            Total Income
          </p>

          <h2 className="text-2xl font-semibold text-green-600 mt-2">
            ₹{analytics.income}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">

          <p className="text-sm text-gray-400">
            Total Expense
          </p>

          <h2 className="text-2xl font-semibold text-red-500 mt-2">
            ₹{analytics.expense}
          </h2>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-6">

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-[320px] border border-gray-200 bg-gray-50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-gray-200 text-sm"
          />

          {/* FILTERS */}

          <div className="flex gap-2 flex-wrap">

            {[
              "All",
              "Food",
              "Shopping",
              "Travel",
              "Health",
              "Entertainment",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                className={`px-4 py-2 rounded-2xl text-sm transition ${
                  filter === item
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* CATEGORY CARDS */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {filteredCategories.map(
          (cat) => (

            <div
              key={cat._id}
              onClick={() =>
                setSelectedCategory(cat)
              }
              className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition cursor-pointer"
            >

              {/* TOP */}

              <div className="flex items-start justify-between">

                <div
                  className="w-12 h-12 rounded-2xl"
                  style={{
                    backgroundColor:
                      cat.iconcolor,
                  }}
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation()

                    handleDelete(
                      cat._id
                    )
                  }}
                  className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg"
                >
                  Delete
                </button>

              </div>

              {/* BODY */}

              <div className="mt-5">

                <h2 className="text-lg font-medium text-gray-800">
                  {cat.name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {cat.subCategory}
                </p>

              </div>

              {/* FOOTER */}

              <div className="mt-5 flex items-center justify-between">

                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {cat.masterCategory}
                </span>

                <span className="text-xs text-gray-400">
                  Open
                </span>

              </div>

            </div>
          )
        )}

      </div>

      {/* DETAILS DRAWER */}

      {selectedCategory && (

        <div className="fixed top-0 right-0 w-[420px] h-screen bg-white shadow-2xl border-l border-gray-100 p-6 overflow-y-auto z-50">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCategory.name}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                {selectedCategory.subCategory}
              </p>

            </div>

            <button
              onClick={() =>
                setSelectedCategory(null)
              }
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl"
            >
              Close
            </button>

          </div>

          {/* TRANSACTIONS */}

          <div className="space-y-4">

            {transactions
              .filter(
                (item) =>
                  item.category ===
                  selectedCategory.name
              )
              .map((item, i) => (

                <div
                  key={i}
                  className="border border-gray-100 rounded-2xl p-4"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="font-medium text-gray-700">
                        {item.reason}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.date} •{" "}
                        {item.time}
                      </p>

                    </div>

                    <span
                      className={`font-semibold ${
                        item.type ===
                        "Income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      ₹{item.amount}
                    </span>

                  </div>

                </div>
              ))}

          </div>

        </div>
      )}

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <form
            onSubmit={
              handleCreate
            }
            className="bg-white w-[420px] rounded-3xl p-7 shadow-2xl"
          >

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Create Category
            </h2>

            {/* NAME */}

<div className="mb-4">

  <label className="text-sm text-gray-500">
    Category Name
  </label>

  <input
    required
    value={form.name}
    onChange={(e) =>
      setForm({
        ...form,
        name: e.target.value,
      })
    }
    placeholder="Food"
    className="w-full mt-2 border border-gray-200 bg-gray-50 px-4 py-3 rounded-2xl outline-none"
  />

</div>

{/* MASTER CATEGORY */}

<div className="mb-4">

  <label className="text-sm text-gray-500">
    Master Category
  </label>

  <select
    value={form.masterCategory}
    onChange={(e) =>
      setForm({
        ...form,
        masterCategory: e.target.value,
        subCategory: "",
      })
    }
    className="w-full mt-2 border border-gray-200 bg-gray-50 px-4 py-3 rounded-2xl outline-none"
  >

    {Object.keys(CATEGORY_DATA).map((item) => (

      <option
        key={item}
        value={item}
      >
        {item}
      </option>

    ))}

  </select>

</div>

{/* SUB CATEGORY */}

<div className="mb-4">

  <label className="text-sm text-gray-500">
    Sub Category
  </label>

  <select
    value={form.subCategory}
    onChange={(e) =>
      setForm({
        ...form,
        subCategory: e.target.value,
      })
    }
    className="w-full mt-2 border border-gray-200 bg-gray-50 px-4 py-3 rounded-2xl outline-none"
  >

    <option value="">
      Select Sub Category
    </option>

    {subCategories.map((item) => (

      <option
        key={item}
        value={item}
      >
        {item}
      </option>

    ))}

  </select>

</div>



{/* COLOR */}

<div className="mb-6">

  <label className="text-sm text-gray-500">
    Icon Color
  </label>

  <input
    type="color"
    value={form.iconcolor}
    onChange={(e) =>
      setForm({
        ...form,
        iconcolor: e.target.value,
      })
    }
    className="w-full mt-2 h-12 rounded-xl border border-gray-200"
  />

</div>


            {/* BUTTONS */}

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="w-full border border-gray-200 py-3 rounded-2xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-2xl transition"
              >
                {loading
                  ? "Saving..."
                  : "Save"}
              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  )
}