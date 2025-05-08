"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Search, DollarSign, Calendar, Clock } from "lucide-react"

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

const LendPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [loans, setLoans] = useState(MOCK_APPROVED_LOANS)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredLoans = loans.filter(
    (loan) =>
      loan.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewLoan = (loanId) => {
    navigate(`/loan/${loanId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lending Opportunities</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search loans..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => (
            <Card
              key={loan.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewLoan(loan.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={loan.profilePic || "/placeholder.svg"} alt={loan.fullName} />
                      <AvatarFallback>{loan.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{loan.fullName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{loan.username}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {loan.interestRate}%
                  </Badge>
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
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-1">Purpose</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{loan.purpose}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredLoans.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No loans found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default LendPage
