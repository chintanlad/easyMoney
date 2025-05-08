"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Slider } from "../components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { CheckCircle } from "lucide-react"

const BorrowPage = () => {
  const navigate = useNavigate()
  const [loanAmount, setLoanAmount] = useState(10000)
  const [interestRate, setInterestRate] = useState(8)
  const [loanDuration, setLoanDuration] = useState(12)
  const [loanPurpose, setLoanPurpose] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Loan application submitted:", {
      amount: loanAmount,
      interestRate,
      duration: loanDuration,
      purpose: loanPurpose,
    })
    setShowSuccessDialog(true)
  }

  const handleCloseDialog = () => {
    setShowSuccessDialog(false)
    navigate("/dashboard")
  }

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanDuration

    if (monthlyRate === 0) return principal / numberOfPayments

    const x = Math.pow(1 + monthlyRate, numberOfPayments)
    return (principal * x * monthlyRate) / (x - 1)
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = monthlyPayment * loanDuration
  const totalInterest = totalPayment - loanAmount

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Apply for a Loan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Application</CardTitle>
              <CardDescription>Fill out the form to apply for a loan</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    min="5000"
                    max="500000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    required
                  />
                  <Slider
                    value={[loanAmount]}
                    min={5000}
                    max={500000}
                    step={5000}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹5,000</span>
                    <span>₹500,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    min="5"
                    max="15"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    required
                  />
                  <Slider
                    value={[interestRate]}
                    min={5}
                    max={15}
                    step={0.5}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanDuration">Loan Duration (months)</Label>
                  <Input
                    id="loanDuration"
                    type="number"
                    min="3"
                    max="60"
                    value={loanDuration}
                    onChange={(e) => setLoanDuration(Number(e.target.value))}
                    required
                  />
                  <Slider
                    value={[loanDuration]}
                    min={3}
                    max={60}
                    step={1}
                    onValueChange={(value) => setLoanDuration(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>3 months</span>
                    <span>60 months</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Textarea
                    id="loanPurpose"
                    placeholder="Describe why you need this loan"
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Submit Loan Application
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
              <CardDescription>Review your loan details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                <p className="text-2xl font-bold">{formatCurrency(loanAmount)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Interest Rate</h3>
                <p className="text-2xl font-bold">{interestRate}%</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Loan Duration</h3>
                <p className="text-2xl font-bold">{loanDuration} months</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Payment</h3>
                <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl">Loan Application Submitted</DialogTitle>
            <DialogDescription className="text-center">
              Your loan application has been submitted successfully. It is now pending approval from our administrators.
              You will be notified once your application is reviewed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseDialog} className="w-full">
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BorrowPage
