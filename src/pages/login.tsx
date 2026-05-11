import { GalleryVerticalEnd } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setMessage("")
    setErrorMsg("")
    setEmailError("")
    setPasswordError("")

    let valid = true

    if (!email.trim()) {
      setEmailError("Please enter email.")
      valid = false
    } else if (!email.includes("@")) {
      setEmailError("Please enter valid email.")
      valid = false
    }

    if (!password.trim()) {
      setPasswordError("Please enter password.")
      valid = false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.")
      valid = false
    }

    if (!valid) return

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      )

      // token save
      localStorage.setItem("token", res.data.token)

      setMessage("Login Successful 🚀")

      // 🔥 DASHBOARD REDIRECT
      setTimeout(() => {
        navigate("/dashboard")
      }, 500)

    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || "Login Failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT */}
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
        <div className="flex items-center gap-2 font-medium text-black">
          <div className="flex size-8 items-center justify-center rounded-md bg-black text-white">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Wallet App
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-xl">

            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-6">
              Login to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-4">

              {/* EMAIL */}
              <div>
                <label>Email</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label>Password</label>
                <input
                  type="password"
                  className="w-full border px-3 py-2 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {message && (
                <p className="text-green-600 text-center">{message}</p>
              )}

              {errorMsg && (
                <p className="text-red-600 text-center">{errorMsg}</p>
              )}

            </form>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:block bg-black"></div>

    </div>
  )
}