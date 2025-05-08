"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { DollarSign, Calendar, Clock, Search, CheckCircle, Users, ArrowRight, Timer, CreditCard } from "lucide-react"
import { useCountdown } from "../hooks/use-countdown"

// Mock data for loans requested by the user
const MOCK_USER_LOANS = [
  {
    id: "1",
    amount: 50000,
    purpose: "Home renovation",
    duration: 12, // months
    interestRate: 8.5,
    status: "pending",
    dateApplied: "2023-05-20",
    dueDate: "2024-05-20",
    lenders: [],
  },
  {
    id: "2",
    amount: 25000,
    purpose: "Education",
    duration: 6, // months
    interestRate: 7.5,
    status: "approved",
    dateApplied: "2023-04-15",
    dueDate: "2023-10-15",
    lenders: [
      {
        id: "l1",
        username: "jane.smith@example.com",
        fullName: "Jane Smith",
        profilePic: "/placeholder.svg?height=40&width=40",
        amount: 15000,
      },
      {
        id: "l2",
        username: "robert.johnson@example.com",
        fullName: "Robert Johnson",
        profilePic: "/placeholder.svg?height=40&width=40",
        amount: 10000,
      },
    ],
  },
  {
    id: "3",
    amount: 100000,
    purpose: "Business expansion",
    duration: 24, // months
    interestRate: 9.0,
    status: "approved",
    dateApplied: "2023-03-10",
    dueDate: "2025-03-10",
    lenders: [
      {
        id: "l3",
        username: "sarah.williams@example.com",
        fullName: "Sarah Williams",
        profilePic: "/placeholder.svg?height=40&width=40",
        amount: 50000,
      },
      {
        id: "l4",
        username: "michael.brown@example.com",
        fullName: "Michael Brown",
        profilePic: "/placeholder.svg?height=40&width=40",
        amount: 30000,
      },
      {
        id: "l5",
        username: "emily.davis@example.com",
        fullName: "Emily Davis",
        profilePic: "/placeholder.svg?height=40&width=40",
        amount: 20000,
      },
    ],
  },
  {
    id: "4",
    amount: 75000,
    purpose: "Debt consolidation",
    duration: 18, // months
    interestRate: 8.0,
    status: "completed",
    dateApplied: "2022-11-05",
    dueDate: "2024-05-05",
    lenders: [
      {
        id: "l6",
        username: "david.wilson@example.com",
        fullName: "David Wilson",
        profilePic: "/placeholder.svg?height=40&width=40",
        amount: 75000,
      },
    ],
  },
]

// Mock data for loans given by the user
const MOCK_GIVEN_LOANS = [
  {
    id: "g1",
    borrowerId: "b1",
    borrowerName: "Jane Smith",
    borrowerEmail: "jane.smith@example.com",
    borrowerPic: "/placeholder.svg?height=40&width=40",
    amount: 15000,
    totalLoanAmount: 25000,
    purpose: "Education",
    duration: 6, // months
    interestRate: 7.5,
    status: "active",
    dateGiven: "2023-04-20",
    dueDate: "2023-10-20",
    expectedReturn: 16125, // Principal + Interest
  },
  {
    id: "g2",
    borrowerId: "b2",
    borrowerName: "Robert Johnson",
    borrowerEmail: "robert.johnson@example.com",
    borrowerPic: "/placeholder.svg?height=40&width=40",
    amount: 30000,
    totalLoanAmount: 100000,
    purpose: "Business expansion",
    duration: 24, // months
    interestRate: 9.0,
    status: "active",
    dateGiven: "2023-03-15",
    dueDate: "2025-03-15",
    expectedReturn: 35400, // Principal + Interest
  },
  {
    id: "g3",
    borrowerId: "b3",
    borrowerName: "David Wilson",
    borrowerEmail: "david.wilson@example.com",
    borrowerPic: "/placeholder.svg?height=40&width=40",
    amount: 20000,
    totalLoanAmount: 75000,
    purpose: "Debt consolidation",
    duration: 18, // months
    interestRate: 8.0,
    status: "completed",
    dateGiven: "2022-11-10",
    dueDate: "2024-05-10",
    expectedReturn: 22400, // Principal + Interest
  },
]

const LoanStatusCard = ({ loan, onViewDetails }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Completed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Unknown
          </Badge>
        )
    }
  }

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${loan.status === "approved" ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (loan.status === "approved") {
          onViewDetails(loan)
        }
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{loan.purpose}</CardTitle>
          {getStatusBadge(loan.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Amount</span>
            </div>
            <span className="font-medium">{formatCurrency(loan.amount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="font-medium">{loan.duration} months</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">Applied</span>
            </div>
            <span className="font-medium">{loan.dateApplied}</span>
          </div>
          {loan.status === "approved" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">Lenders</span>
              </div>
              <span className="font-medium">{loan.lenders.length}</span>
            </div>
          )}
          {loan.status === "approved" && (
            <div className="mt-2 text-sm text-blue-600 flex items-center justify-end">
              <span>View details</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const LoanGivenCard = ({ loan }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Completed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Unknown
          </Badge>
        )
    }
  }

  // Calculate time remaining
  const dueDate = new Date(loan.dueDate)
  const now = new Date()
  const timeRemaining = dueDate > now ? dueDate - now : 0
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={loan.borrowerPic || "/placeholder.svg"} alt={loan.borrowerName} />
              <AvatarFallback>{loan.borrowerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{loan.borrowerName}</CardTitle>
              <p className="text-xs text-muted-foreground">{loan.borrowerEmail}</p>
            </div>
          </div>
          {getStatusBadge(loan.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Your Contribution</span>
            </div>
            <span className="font-medium">{formatCurrency(loan.amount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Total Loan</span>
            </div>
            <span className="font-medium">{formatCurrency(loan.totalLoanAmount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Expected Return</span>
            </div>
            <span className="font-medium">{formatCurrency(loan.expectedReturn)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="font-medium">{loan.duration} months</span>
          </div>
          {loan.status === "active" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Time Remaining</span>
              </div>
              <span className="font-medium">{daysRemaining} days</span>
            </div>
          )}
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-1">Purpose</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{loan.purpose}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return <span className="font-medium text-red-500">Expired</span>
  }

  return (
    <div className="flex items-center space-x-2">
      <Timer className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium">
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    </div>
  )
}

const TransactionPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("loan-status")
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [showLoanDetailsDialog, setShowLoanDetailsDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleViewLoanDetails = (loan) => {
    setSelectedLoan(loan)
    setShowLoanDetailsDialog(true)
  }

  const handlePayNow = () => {
    setShowLoanDetailsDialog(false)
    setShowPaymentDialog(true)
  }

  const handlePaymentSubmit = () => {
    setShowPaymentDialog(false)
    setShowPaymentSuccessDialog(true)
  }

  const handleCloseSuccessDialog = () => {
    setShowPaymentSuccessDialog(false)
    // Update the loan status to completed in a real app
  }

  // Filter loans based on search term
  const filteredUserLoans = MOCK_USER_LOANS.filter((loan) =>
    loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredGivenLoans = MOCK_GIVEN_LOANS.filter(
    (loan) =>
      loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="loan-status" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="loan-status">Loan Status</TabsTrigger>
            <TabsTrigger value="loan-given">Loan Given</TabsTrigger>
          </TabsList>

          <TabsContent value="loan-status">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUserLoans.map((loan) => (
                <LoanStatusCard key={loan.id} loan={loan} onViewDetails={handleViewLoanDetails} />
              ))}

              {filteredUserLoans.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No loans found matching your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="loan-given">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGivenLoans.map((loan) => (
                <LoanGivenCard key={loan.id} loan={loan} />
              ))}

              {filteredGivenLoans.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No loans given matching your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Loan Details Dialog */}
      <Dialog open={showLoanDetailsDialog} onOpenChange={setShowLoanDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Loan Details</DialogTitle>
            <DialogDescription>
              {selectedLoan?.purpose} - {formatCurrency(selectedLoan?.amount)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Lenders</h3>
              <div className="space-y-3">
                {selectedLoan?.lenders.map((lender) => (
                  <div key={lender.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lender.profilePic || "/placeholder.svg"} alt={lender.fullName} />
                        <AvatarFallback>{lender.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{lender.fullName}</p>
                        <p className="text-xs text-muted-foreground">{lender.username}</p>
                      </div>
                    </div>
                    <p className="font-medium">{formatCurrency(lender.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Time Remaining</h3>
              <CountdownTimer targetDate={selectedLoan?.dueDate} />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Total Amount to Repay</h3>
              <p className="text-xl font-bold">
                {selectedLoan
                  ? formatCurrency(
                      selectedLoan.amount * (1 + (selectedLoan.interestRate / 100) * (selectedLoan.duration / 12)),
                    )
                  : ""}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePayNow} className="w-full">
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>
              Pay your loan for {selectedLoan?.purpose} - {formatCurrency(selectedLoan?.amount)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Payment Amount</h3>
              <p className="text-xl font-bold">
                {selectedLoan
                  ? formatCurrency(
                      selectedLoan.amount * (1 + (selectedLoan.interestRate / 100) * (selectedLoan.duration / 12)),
                    )
                  : ""}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Payment Method</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  UPI
                </Button>
                <Button variant="outline" className="justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Card
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePaymentSubmit} className="w-full">
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Success Dialog */}
      <Dialog open={showPaymentSuccessDialog} onOpenChange={setShowPaymentSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-center text-xl">Payment Successful</DialogTitle>
            <DialogDescription className="text-center">
              Your payment has been processed successfully. The lenders have been notified, and your loan has been
              marked as paid.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseSuccessDialog} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TransactionPage
