"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Calendar,
  Phone,
  MapPin,
  CreditCard,
  Briefcase,
  DollarSign,
} from "lucide-react"

// Mock user data - in a real app, you would fetch this from an API
const MOCK_USERS = [
  {
    id: "1",
    username: "john.doe@example.com",
    fullName: "John Doe",
    profilePic: "/placeholder.svg?height=100&width=100",
    status: "pending",
    dateApplied: "2023-05-15",
    dateOfBirth: "1990-05-20",
    address: "123 Main St, Bangalore, Karnataka",
    phoneNumber: "9876543210",
    aadharNumber: "123456789012",
    employmentStatus: "employee",
    annualIncome: "500000-800000",
  },
  {
    id: "2",
    username: "jane.smith@example.com",
    fullName: "Jane Smith",
    profilePic: "/placeholder.svg?height=100&width=100",
    status: "pending",
    dateApplied: "2023-05-16",
    dateOfBirth: "1995-08-12",
    address: "456 Park Ave, Mumbai, Maharashtra",
    phoneNumber: "8765432109",
    aadharNumber: "234567890123",
    employmentStatus: "student",
    annualIncome: "0-50000",
  },
  {
    id: "3",
    username: "robert.johnson@example.com",
    fullName: "Robert Johnson",
    profilePic: "/placeholder.svg?height=100&width=100",
    status: "pending",
    dateApplied: "2023-05-17",
    dateOfBirth: "1988-11-30",
    address: "789 Lake View, Delhi, Delhi",
    phoneNumber: "7654321098",
    aadharNumber: "345678901234",
    employmentStatus: "startup",
    annualIncome: "100000-300000",
  },
  {
    id: "4",
    username: "sarah.williams@example.com",
    fullName: "Sarah Williams",
    profilePic: "/placeholder.svg?height=100&width=100",
    status: "pending",
    dateApplied: "2023-05-18",
    dateOfBirth: "1992-02-15",
    address: "101 Hill Road, Chennai, Tamil Nadu",
    phoneNumber: "6543210987",
    aadharNumber: "456789012345",
    employmentStatus: "employee",
    annualIncome: "300000-500000",
  },
  {
    id: "5",
    username: "michael.brown@example.com",
    fullName: "Michael Brown",
    profilePic: "/placeholder.svg?height=100&width=100",
    status: "pending",
    dateApplied: "2023-05-19",
    dateOfBirth: "1985-07-08",
    address: "202 River Side, Kolkata, West Bengal",
    phoneNumber: "5432109876",
    aadharNumber: "567890123456",
    employmentStatus: "other",
    annualIncome: "800000+",
  },
]

const UserDetailsPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch user data from an API
    const foundUser = MOCK_USERS.find((u) => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
    }
  }, [userId])

  const handleBack = () => {
    navigate("/admin/account-approval")
  }

  const handleApprove = () => {
    setUser({ ...user, status: "approved" })
    // In a real app, you would make an API call to update the user status
  }

  const handleReject = () => {
    setUser({ ...user, status: "rejected" })
    // In a real app, you would make an API call to update the user status
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading user details...</p>
      </div>
    )
  }

  // Format the date of birth
  const formattedDob = new Date(user.dateOfBirth).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Account Approval
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center pb-0">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profilePic || "/placeholder.svg"} alt={user.fullName} />
                  <AvatarFallback className="text-2xl">{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{user.fullName}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.username}</p>
              <div className="mt-2">
                {user.status === "pending" && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                )}
                {user.status === "approved" && (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Approved
                  </Badge>
                )}
                {user.status === "rejected" && (
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    Rejected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Applied on {user.dateApplied}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{user.phoneNumber}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{user.address}</span>
                </div>
              </div>

              {user.status === "pending" && (
                <div className="mt-6 space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Account
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50"
                    onClick={handleReject}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                    <p>{user.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p>{user.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h3>
                    <p>{formattedDob}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                    <p>{user.phoneNumber}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                  <p>{user.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-medium">Aadhar Number</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.aadharNumber.replace(/(\d{4})/g, "$1 ").trim()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <h3 className="text-sm font-medium">Employment Status</h3>
                      <p className="text-sm text-muted-foreground capitalize">{user.employmentStatus}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">Annual Income</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.annualIncome === "0-50000" && "₹0 - ₹50,000"}
                      {user.annualIncome === "50000-100000" && "₹50,000 - ₹1,00,000"}
                      {user.annualIncome === "100000-300000" && "₹1,00,000 - ₹3,00,000"}
                      {user.annualIncome === "300000-500000" && "₹3,00,000 - ₹5,00,000"}
                      {user.annualIncome === "500000-800000" && "₹5,00,000 - ₹8,00,000"}
                      {user.annualIncome === "800000+" && "Above ₹8,00,000"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsPage
