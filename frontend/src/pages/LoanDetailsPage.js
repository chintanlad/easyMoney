"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { ArrowLeft, DollarSign, User, CheckCircle } from "lucide-react"

// Mock data for approved loans
const MOCK_APPROVED_LOANS = [
  {
    id: "1",
    userId: "2",
    username: "jane.smith@example.com",
    fullName: "Jane Smith",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 25000,
    purpose: "Education",
    duration: 24, // months
    interestRate: 7.5,
    status: "approved",
    dateApplied: "2023-05-21",
  },
  {
    id: "2",
    userId: "3",
    username: "robert.johnson@example.com",
    fullName: "Robert Johnson",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 100000,
    purpose: "Business expansion",
    duration: 36, // months
    interestRate: 9.0,
    status: "approved",
    dateApplied: "2023-05-22",
  },
  {
    id: "3",
    userId: "4",
    username: "sarah.williams@example.com",
    fullName: "Sarah Williams",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 75000,
    purpose: "Debt consolidation",
    duration: 18, // months
    interestRate: 8.0,
    status: "approved",
    dateApplied: "2023-05-23",
  },
]

const LoanDetailsPage = () => {
  const { loanId } = useParams()
  const navigate = useNavigate()
  const [loan, setLoan] = useState(null)
  const [lendAmount, setLendAmount] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch loan data from an API
    const foundLoan = MOCK_APPROVED_LOANS.find((l) => l.id === loanId)
    if (foundLoan) {
      setLoan(foundLoan)
      // Set default lend amount to the full loan amount
      setLendAmount(foundLoan.amount.toString())
    }
  }, [loanId])

  const handleBack = () => {
    navigate("/lend")
  }

  const handleLendAmountChange = (e) => {
    const value = e.target.value
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setLendAmount(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Lending amount:", lendAmount)
    setShowSuccessDialog(true)
  }

  const handleCloseDialog = () => {
    setShowSuccessDialog(false)
    navigate("/dashboard")
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (!loan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userName="John Doe" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p>Loading loan details...</p>
        </main>
      </div>
    )
  }

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loan.amount
    const monthlyRate = loan.interestRate / 100 / 12
    const numberOfPayments = loan.duration

    if (monthlyRate === 0) return principal / numberOfPayments

    const x = Math.pow(1 + monthlyRate, numberOfPayments)
    return (principal * x * monthlyRate) / (x - 1)
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = monthlyPayment * loan.duration
  const totalInterest = totalPayment - loan.amount

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lending Opportunities
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Borrower Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center pb-0">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={loan.profilePic || "/placeholder.svg"} alt={loan.fullName} />
                  <AvatarFallback className="text-2xl">{loan.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{loan.fullName}</CardTitle>
              <p className="text-sm text-muted-foreground">{loan.username}</p>
              <div className="mt-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Verified Borrower
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm">Loans Taken</span>
                  </div>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Repayment Rate</span>
                  </div>
                  <span className="font-medium">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Review the loan details before lending</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                  <p className="text-2xl font-bold">{formatCurrency(loan.amount)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Interest Rate</h3>
                  <p className="text-2xl font-bold">{loan.interestRate}%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Loan Duration</h3>
                  <p className="text-2xl font-bold">{loan.duration} months</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                  <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Payment</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Loan Purpose</h3>
                <p className="text-base">{loan.purpose}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Amount to Lend</h3>
                    <Input
                      type="text"
                      value={lendAmount}
                      onChange={handleLendAmountChange}
                      placeholder="Enter amount to lend"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Maximum amount: {formatCurrency(loan.amount)}</p>
                  </div>
                  <Button type="submit" className="w-full">
                    Pay Now
                  </Button>
                </div>
              </form>
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
            <DialogTitle className="text-center text-xl">Payment Successful</DialogTitle>
            <DialogDescription className="text-center">
              Your payment of {formatCurrency(Number.parseInt(lendAmount, 10))} has been processed successfully. The
              borrower has been notified, and the loan has been funded.
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

export default LoanDetailsPage
