"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "../lib/utils"

const PersonalInfoPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const username = location.state?.username || ""

  const [date, setDate] = useState()
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    aadharNumber: "",
    employmentStatus: "",
    annualIncome: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    // Special validation for Aadhar number
    if (name === "aadharNumber") {
      // Only allow digits and limit to 12 characters
      const aadharValue = value.replace(/\D/g, "").slice(0, 12)
      setPersonalInfo({
        ...personalInfo,
        [name]: aadharValue,
      })
      return
    }

    // For phone number, only allow digits
    if (name === "phoneNumber") {
      const phoneValue = value.replace(/\D/g, "")
      setPersonalInfo({
        ...personalInfo,
        [name]: phoneValue,
      })
      return
    }

    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate Aadhar number
    if (personalInfo.aadharNumber.length !== 12) {
      alert("Aadhar number must be 12 digits")
      return
    }

    // Validate phone number
    if (personalInfo.phoneNumber.length < 10) {
      alert("Please enter a valid phone number")
      return
    }

    // Validate date of birth
    if (!date) {
      alert("Please select your date of birth")
      return
    }

    const formData = {
      ...personalInfo,
      dateOfBirth: date,
      username,
    }

    console.log("Personal info submitted:", formData)

    // Navigate to OTP verification page
    navigate("/otp-verification", {
      state: {
        email: username,
        isLogin: false,
      },
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Personal Information</CardTitle>
          <CardDescription>Please provide your details to complete registration</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={personalInfo.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your address"
                value={personalInfo.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={personalInfo.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select your date of birth"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadharNumber">Aadhar Card Number</Label>
              <Input
                id="aadharNumber"
                name="aadharNumber"
                placeholder="Enter your 12-digit Aadhar number"
                value={personalInfo.aadharNumber}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">Must be 12 digits</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select onValueChange={(value) => handleSelectChange("employmentStatus", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Select onValueChange={(value) => handleSelectChange("annualIncome", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your annual income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50000">₹0 - ₹50,000</SelectItem>
                  <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="100000-300000">₹1,00,000 - ₹3,00,000</SelectItem>
                  <SelectItem value="300000-500000">₹3,00,000 - ₹5,00,000</SelectItem>
                  <SelectItem value="500000-800000">₹5,00,000 - ₹8,00,000</SelectItem>
                  <SelectItem value="800000+">Above ₹8,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit & Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default PersonalInfoPage
