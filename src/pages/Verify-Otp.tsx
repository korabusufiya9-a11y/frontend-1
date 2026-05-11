import { useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { GalleryVerticalEnd } from "lucide-react"

export default function VerifyOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const email =
    location.state?.email || ""

  const [otp, setOtp] = useState("")
  const [loading, setLoading] =
    useState(false)

  const [msg, setMsg] = useState("")
  const [error, setError] =
    useState("")

  const [resendLoading, setResendLoading] =
    useState(false)

  // Verify OTP
  const handleVerify = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setMsg("")
    setError("")

    if (!otp.trim()) {
      setError("Please enter OTP")
      return
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:4000/api/auth/verifyotp",
        {
          email,
          otpInput: otp,
        }
      )

      setMsg(res.data.message)

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "OTP Verification Failed"
      )
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOtp =
    async () => {
      setMsg("")
      setError("")

      try {
        setResendLoading(true)

        const res = await axios.post(
          "http://localhost:4000/api/auth/resendOtp",
          { email }
        )

        setMsg(res.data.message)

      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "Resend Failed"
        )
      } finally {
        setResendLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="size-9 rounded-md bg-black text-white flex items-center justify-center">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Wallet App
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          OTP sent to
          <br />
          <span className="font-medium text-black">
            {email}
          </span>
        </p>

        <form
          onSubmit={handleVerify}
          className="space-y-4"
        >
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-3 text-center tracking-widest text-lg outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-900"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="w-full border rounded-lg py-3 font-medium hover:bg-gray-100"
          >
            {resendLoading
              ? "Sending..."
              : "Resend OTP"}
          </button>

          {msg && (
            <p className="text-green-600 text-center font-medium">
              {msg}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center font-medium">
              {error}
            </p>
          )}
        </form>

        <p className="text-sm text-center mt-5 text-gray-500">
          Back to Login
        </p>
      </div>
    </div>
  )
}