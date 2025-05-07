"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { CheckCircle, XCircle, Search, DollarSign } from "lucide-react"
import { Input } from "../../components/ui/input"

// Mock data for loan requests
const MOCK_LOANS = [
  {
    id: "1",
    userId: "1",
    username: "john.doe@example.com",
    fullName: "John Doe",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 50000,
    purpose: "Home renovation",
    duration: 12, // months
    interestRate: 8.5,
    status: "pending",
    dateApplied: "2023-05-20",
  },
  {
    id: "2",
    userId: "2",
    username: "jane.smith@example.com",
    fullName: "Jane Smith",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 25000,
    purpose: "Education",
    duration: 24, // months
    interestRate: 7.5,
    status: "pending",
    dateApplied: "2023-05-21",
  },
  {
    id: "3",
    userId: "3",
    username: "robert.johnson@example.com",
    fullName: "Robert Johnson",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 100000,
    purpose: "Business expansion",
    duration: 36, // months
    interestRate: 9.0,
    status: "pending",
    dateApplied: "2023-05-22",
  },
  {
    id: "4",
    userId: "4",
    username: "sarah.williams@example.com",
    fullName: "Sarah Williams",
    profilePic: "/placeholder.svg?height=40&width=40",
    amount: 75000,
    purpose: "Debt consolidation",
    duration: 18, // months
    interestRate: 8.0,
    status: "pending",
    dateApplied: "2023-05-23",
  },
]

const LoanApprovalPage = () => {
  const [loans, setLoans] = useState(MOCK_LOANS)
  const [searchTerm, setSearchTerm] = useState("")

  const handleApprove = (loanId) => {
    setLoans(loans.map((loan) => (loan.id === loanId ? { ...loan, status: "approved" } : loan)))
  }

  const handleReject = (loanId) => {
    setLoans(loans.map((loan) => (loan.id === loanId ? { ...loan, status: "rejected" } : loan)))
  }

  const filteredLoans = loans.filter(
    (loan) =>
      loan.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Loan Approval Requests</h2>
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

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Loan Details</th>
                  <th className="text-left p-4">Purpose</th>
                  <th className="text-left p-4">Date Applied</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={loan.profilePic || "/placeholder.svg"} alt={loan.fullName} />
                          <AvatarFallback>{loan.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{loan.fullName}</div>
                          <div className="text-sm text-muted-foreground">{loan.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="font-medium">₹{loan.amount.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {loan.duration} months @ {loan.interestRate}%
                      </div>
                    </td>
                    <td className="p-4">{loan.purpose}</td>
                    <td className="p-4">{loan.dateApplied}</td>
                    <td className="p-4">
                      {loan.status === "pending" && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Pending
                        </Badge>
                      )}
                      {loan.status === "approved" && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Approved
                        </Badge>
                      )}
                      {loan.status === "rejected" && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                          Rejected
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {loan.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(loan.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleReject(loan.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                      {loan.status !== "pending" && (
                        <Badge variant={loan.status === "approved" ? "success" : "destructive"}>
                          {loan.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredLoans.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-muted-foreground">
                      No loan requests found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoanApprovalPage
