import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

import axios from "axios";

/* ================= API ================= */

const API = "http://localhost:4000/api/labels";

/* ================= TYPE ================= */

interface LabelType {
  _id?: string;
  userId: string;
  name: string;
  color: string;
}

/* ================= COMPONENT ================= */

export default function LabelPage() {
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<LabelType>({
    userId: "69f06a51cd7d1d1460809f0a",
    name: "",
    color: "#6366f1",
  });

  /* ================= FETCH ================= */

  const fetchLabels = async () => {
    try {
      const res = await axios.get(`${API}/labelgetAll`);

      setLabels(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  /* ================= CHANGE ================= */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= CREATE ================= */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${API}/labelcreate`,
        formData
      );

      setFormData({
        userId: "69f06a51cd7d1d1460809f0a",
        name: "",
        color: "#6366f1",
      });

      setShowModal(false);
      fetchLabels();

      alert("Label Created Successfully");
    } catch (error: any) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to create label"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id?: string) => {
    if (!id) return;

    try {
      await axios.delete(
        `${API}/labeldelete/${id}`
      );

      fetchLabels();

      alert("Label Deleted");
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Labels
          </h1>
          <p className="text-gray-500">
            Manage your labels
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl"
        >
          + Add Label
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">
                Name
              </th>
              <th className="text-left p-4">
                Color
              </th>
              <th className="text-center p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {labels.length > 0 ? (
              labels.map((label) => (
                <tr
                  key={label._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    {label.name}
                  </td>

                  <td className="p-4">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{
                        backgroundColor:
                          label.color,
                      }}
                    />
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        handleDelete(
                          label._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center p-10 text-gray-500"
                >
                  No Labels Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md p-6 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6">
              Add Label
            </h2>

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Label Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mb-4"
              required
            />

            {/* COLOR */}
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-12 mb-4"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="w-full border py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl"
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
  );
}