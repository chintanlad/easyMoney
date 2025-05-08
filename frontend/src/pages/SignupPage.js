"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import axios from 'axios';


const SignupPage = () => {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({
    username: "",
    email:"",
    passwordHash: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupData({
      ...signupData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        username: signupData.username,
        email: signupData.email,
        passwordHash: signupData.password,
        role: "USER", 
      })
  
      console.log("Signup success:", response.data)
      navigate("/personal-info", { state: { username: signupData.username } })
    } catch (error) {
      console.error("Signup failed:", error)
      alert("Signup failed. Try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Sign up to start lending and borrowing</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Choose a username"
                value={signupData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Choose a email"
                value={signupData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={signupData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={signupData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Continue to Personal Info
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignupPage
