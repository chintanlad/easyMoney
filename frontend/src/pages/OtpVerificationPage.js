"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Mail } from "lucide-react"

const OtpVerificationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, isLogin } = location.state || { email: "", isLogin: false }

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  // Generate a random OTP for demo purposes
  const [generatedOtp, setGeneratedOtp] = useState("")

  useEffect(() => {
    // Generate a random 6-digit OTP for demonstration
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(randomOtp)
    console.log("Generated OTP:", randomOtp) // In a real app, this would be sent to the user's email

    // Start the countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setIsResendDisabled(false)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResendOtp = () => {
    // Generate a new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    console.log("New OTP:", newOtp)

    // Reset timer
    setTimer(60)
    setIsResendDisabled(true)

    // Start countdown again
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setIsResendDisabled(false)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const enteredOtp = otp.join("")

    if (enteredOtp === generatedOtp) {
      console.log("OTP verified successfully")

      // Navigate based on whether this is a login or signup flow
      if (isLogin) {
        navigate("/dashboard")
      } else {
        navigate("/verification")
      }
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            We've sent a verification code to <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="otp-0">Enter the 6-digit code</Label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    className="w-12 h-12 text-center text-lg p-0"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {isResendDisabled ? (
                  <p>Resend code in {timer} seconds</p>
                ) : (
                  <button type="button" className="text-primary hover:underline" onClick={handleResendOtp}>
                    Resend code
                  </button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default OtpVerificationPage
