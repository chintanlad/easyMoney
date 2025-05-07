"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { CheckCircle } from "lucide-react"

const VerificationPage = () => {
  const navigate = useNavigate()

  const handleGoToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Verification Pending</CardTitle>
          <CardDescription>Your account is under verification</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for registering with our P2P Lending Platform. Our team is currently reviewing your information.
            This process usually takes 1-2 business days. You will receive an email notification once your account is
            verified.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleGoToLogin}>Return to Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerificationPage
