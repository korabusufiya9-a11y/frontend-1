import { useState } from "react"
import axios from "axios"
import { GalleryVerticalEnd } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [usernameError, setUsernameError] =
    useState("")
  const [emailError, setEmailError] =
    useState("")
  const [passwordError, setPasswordError] =
    useState("")

  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] =
    useState("")
  const [errorMsg, setErrorMsg] =
    useState("")

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setSuccessMsg("")
    setErrorMsg("")

    setUsernameError("")
    setEmailError("")
    setPasswordError("")

    let valid = true

    // Username Validation
    if (!username.trim()) {
      setUsernameError(
        "Please enter full name"
      )
      valid = false
    }

    // Email Validation
    if (!email.trim()) {
      setEmailError(
        "Please enter email"
      )
      valid = false
    } else if (!email.includes("@")) {
      setEmailError(
        "Please enter valid email"
      )
      valid = false
    }

    // Password Validation
    if (!password.trim()) {
      setPasswordError(
        "Please enter password"
      )
      valid = false
    } else if (password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters"
      )
      valid = false
    }

    if (!valid) return

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          username,
          email,
          password,
        }
      )

      setSuccessMsg(res.data.message)

      // OTP page ला redirect
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email: email },
        })
      }, 1500)

    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.msg ||
          error.response?.data?.message ||
          "Registration Failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 font-semibold text-black text-lg">
            <div className="flex size-9 items-center justify-center rounded-md bg-black text-white">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Wallet App
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Register to continue
        </p>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            {usernameError && (
              <p className="text-red-600 text-sm mt-1">
                {usernameError}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            {emailError && (
              <p className="text-red-600 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />

            {passwordError && (
              <p className="text-red-600 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-900"
          >
            {loading
              ? "Creating..."
              : "Register"}
          </button>

          {/* Success */}
          {successMsg && (
            <p className="text-green-600 text-center font-medium">
              {successMsg}
            </p>
          )}

          {/* Error */}
          {errorMsg && (
            <p className="text-red-600 text-center font-medium">
              {errorMsg}
            </p>
          )}
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-5 text-gray-500">
          Already have account?{" "}
          <span
            onClick={() =>
              navigate("/login")
            }
            className="text-black font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}