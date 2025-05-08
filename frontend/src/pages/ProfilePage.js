"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Calendar, Phone, MapPin, CreditCard, Briefcase, DollarSign, Mail, User } from "lucide-react"

const ProfilePage = () => {
  const navigate = useNavigate()

  // Mock user data
  const [user, setUser] = useState({
    id: "1",
    username: "john.doe@example.com",
    fullName: "John Doe",
    profilePic: "/placeholder.svg?height=100&width=100",
    dateOfBirth: "1990-05-20",
    address: "123 Main St, Bangalore, Karnataka",
    phoneNumber: "9876543210",
    aadharNumber: "123456789012",
    employmentStatus: "employee",
    annualIncome: "500000-800000",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    address: user.address,
    phoneNumber: user.phoneNumber,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Update user data
    setUser({
      ...user,
      fullName: formData.fullName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
    })
    setIsEditing(false)
  }

  // Format the date of birth
  const formattedDob = new Date(user.dateOfBirth).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user.fullName} userAvatar={user.profilePic} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

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
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{user.username}</span>
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
            </CardContent>
          </Card>

          {/* User Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal and account details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    {isEditing ? (
                      <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    ) : (
                      <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user.fullName}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.username}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{formattedDob}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  ) : (
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.address}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.aadharNumber.replace(/(\d{4})/g, "$1 ").trim()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus">Employment Status</Label>
                    <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="capitalize">{user.employmentStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {user.annualIncome === "0-50000" && "₹0 - ₹50,000"}
                      {user.annualIncome === "50000-100000" && "₹50,000 - ₹1,00,000"}
                      {user.annualIncome === "100000-300000" && "₹1,00,000 - ₹3,00,000"}
                      {user.annualIncome === "300000-500000" && "₹3,00,000 - ₹5,00,000"}
                      {user.annualIncome === "500000-800000" && "₹5,00,000 - ₹8,00,000"}
                      {user.annualIncome === "800000+" && "Above ₹8,00,000"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <>
                    <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" type="button" onClick={() => navigate("/dashboard")}>
                      OK
                    </Button>
                    <Button type="button" onClick={() => setIsEditing(true)}>
                      Update
                    </Button>
                  </>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
