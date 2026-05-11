import React, {
  useEffect,
  useState,
} from "react"

import axios from "axios"

interface Budget {
  _id: string
  name: string
  amount: number
  currency: string
  period: string
  totalSpent: number
  variance: number
  status: string
  startDate: string
  endDate: string
}

export default function BudgetPage() {

  const [budgets, setBudgets] =
    useState<Budget[]>([])

  const [showModal, setShowModal] =
    useState(false)

  const [formData, setFormData] =
    useState({
      userId:
        "69d9b3c45f08e061f9c5bcf4",

      categoryId: "",

      name: "",

      amount: 0,

      currency: "INR",

      period: "monthly",

      startDate: "",

      endDate: "",
    })

  /* ================= GET BUDGETS ================= */

  const getAllBudgets =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:4000/api/budgets"
          )

        setBudgets(
          response.data.data
        )

      } catch (error) {

        console.log(error)
      }
    }

  useEffect(() => {

    getAllBudgets()

  }, [])

  /* ================= CREATE ================= */

  const createBudget =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      try {

        await axios.post(
          "http://localhost:4000/api/budgets",
          formData
        )

        alert(
          "Budget Created Successfully"
        )

        getAllBudgets()

        setShowModal(false)

        setFormData({
          userId:
            "",

          categoryId: "",

          name: "",

          amount: 0,

          currency: "INR",

          period: "monthly",

          startDate: "",

          endDate: "",
        })

      } catch (error: any) {

        console.log(error)

        alert(
          error.response?.data
            ?.message ||
          "Error creating budget"
        )
      }
    }

  /* ================= DELETE ================= */

  const deleteBudget =
    async (id: string) => {

      try {

        await axios.delete(
          `http://localhost:4000/api/budgets/${id}`
        )

        alert(
          "Budget Deleted"
        )

        getAllBudgets()

      } catch (error) {

        console.log(error)
      }
    }

  return (

    <div className="p-6 min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Budget Management
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Budget
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Budget Name
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Currency
              </th>

              <th className="p-4 text-left">
                Period
              </th>

              <th className="p-4 text-left">
                Start Date
              </th>

              <th className="p-4 text-left">
                End Date
              </th>

              <th className="p-4 text-left">
                Spent
              </th>

              <th className="p-4 text-left">
                Variance
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {budgets.length > 0 ? (

              budgets.map(
                (budget) => (

                  <tr
                    key={budget._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {budget.name}
                    </td>

                    <td className="p-4">
                      ₹ {budget.amount}
                    </td>

                    <td className="p-4">
                      {budget.currency}
                    </td>

                    <td className="p-4 capitalize">
                      {budget.period}
                    </td>

                    <td className="p-4">
                      {
                        new Date(
                          budget.startDate
                        ).toLocaleDateString()
                      }
                    </td>

                    <td className="p-4">
                      {
                        new Date(
                          budget.endDate
                        ).toLocaleDateString()
                      }
                    </td>

                    <td className="p-4 text-red-500 font-semibold">
                      ₹ {budget.totalSpent}
                    </td>

                    <td className="p-4 text-blue-600 font-semibold">
                      ₹ {budget.variance}
                    </td>

                    <td className="p-4">

                      <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">

                        {budget.status}

                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex justify-center">

                        <button
                          onClick={() =>
                            deleteBudget(
                              budget._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan={10}
                  className="text-center p-6 text-gray-500"
                >
                  No Budgets Found
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white rounded-2xl p-6 w-[500px]">

            <h2 className="text-2xl font-bold mb-5">
              Add Budget
            </h2>

            <form
              onSubmit={
                createBudget
              }
            >

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Budget Name"
                  value={
                    formData.name
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      name:
                        e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={
                    formData.amount
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      amount:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                  className="border p-3 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Currency"
                  value={
                    formData.currency
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      currency:
                        e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                />

                <select
                  value={
                    formData.period
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      period:
                        e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                >

                  <option value="daily">
                    Daily
                  </option>

                  <option value="weekly">
                    Weekly
                  </option>

                  <option value="monthly">
                    Monthly
                  </option>

                  <option value="yearly">
                    Yearly
                  </option>

                </select>

                <input
                  type="date"
                  value={
                    formData.startDate
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      startDate:
                        e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                />

                <input
                  type="date"
                  value={
                    formData.endDate
                  }
                  onChange={(
                    e
                  ) =>
                    setFormData({
                      ...formData,
                      endDate:
                        e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-6">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Save Budget
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}