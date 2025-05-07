"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { CheckCircle, XCircle, Search } from "lucide-react"
import { Input } from "../../components/ui/input"

// Mock data for pending users
const MOCK_USERS = [
  {
    id: "1",
    username: "john.doe@example.com",
    fullName: "John Doe",
    profilePic: "/placeholder.svg?height=40&width=40",
    status: "pending",
    dateApplied: "2023-05-15",
    employmentStatus: "employee",
    annualIncome: "500000-800000",
  },
  {
    id: "2",
    username: "jane.smith@example.com",
    fullName: "Jane Smith",
    profilePic: "/placeholder.svg?height=40&width=40",
    status: "pending",
    dateApplied: "2023-05-16",
    employmentStatus: "student",
    annualIncome: "0-50000",
  },
  {
    id: "3",
    username: "robert.johnson@example.com",
    fullName: "Robert Johnson",
    profilePic: "/placeholder.svg?height=40&width=40",
    status: "pending",
    dateApplied: "2023-05-17",
    employmentStatus: "startup",
    annualIncome: "100000-300000",
  },
  {
    id: "4",
    username: "sarah.williams@example.com",
    fullName: "Sarah Williams",
    profilePic: "/placeholder.svg?height=40&width=40",
    status: "pending",
    dateApplied: "2023-05-18",
    employmentStatus: "employee",
    annualIncome: "300000-500000",
  },
  {
    id: "5",
    username: "michael.brown@example.com",
    fullName: "Michael Brown",
    profilePic: "/placeholder.svg?height=40&width=40",
    status: "pending",
    dateApplied: "2023-05-19",
    employmentStatus: "other",
    annualIncome: "800000+",
  },
]

const AccountApprovalPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState(MOCK_USERS)
  const [searchTerm, setSearchTerm] = useState("")

  const handleViewDetails = (userId) => {
    navigate(`/admin/user/${userId}`)
  }

  const handleApprove = (userId, e) => {
    e.stopPropagation() // Prevent triggering the row click
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "approved" } : user)))
  }

  const handleReject = (userId, e) => {
    e.stopPropagation() // Prevent triggering the row click
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "rejected" } : user)))
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Account Approval Requests</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
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
                  <th className="text-left p-4">Date Applied</th>
                  <th className="text-left p-4">Employment</th>
                  <th className="text-left p-4">Income Range</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleViewDetails(user.id)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.profilePic || "/placeholder.svg"} alt={user.fullName} />
                          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.fullName}</div>
                          <div className="text-sm text-muted-foreground">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{user.dateApplied}</td>
                    <td className="p-4 capitalize">{user.employmentStatus}</td>
                    <td className="p-4">
                      {user.annualIncome === "0-50000" && "₹0 - ₹50,000"}
                      {user.annualIncome === "50000-100000" && "₹50,000 - ₹1,00,000"}
                      {user.annualIncome === "100000-300000" && "₹1,00,000 - ₹3,00,000"}
                      {user.annualIncome === "300000-500000" && "₹3,00,000 - ₹5,00,000"}
                      {user.annualIncome === "500000-800000" && "₹5,00,000 - ₹8,00,000"}
                      {user.annualIncome === "800000+" && "Above ₹8,00,000"}
                    </td>
                    <td className="p-4">
                      {user.status === "pending" && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          Pending
                        </Badge>
                      )}
                      {user.status === "approved" && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Approved
                        </Badge>
                      )}
                      {user.status === "rejected" && (
                        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                          Rejected
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {user.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={(e) => handleApprove(user.id, e)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={(e) => handleReject(user.id, e)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                      {user.status !== "pending" && (
                        <Badge variant={user.status === "approved" ? "success" : "destructive"}>
                          {user.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-muted-foreground">
                      No users found matching your search.
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

export default AccountApprovalPage
