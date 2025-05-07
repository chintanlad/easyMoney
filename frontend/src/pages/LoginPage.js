"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const LoginPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("login")

  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "user",
  })

  // Signup form state
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target
    setSignupData({
      ...signupData,
      [name]: value,
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("Login submitted:", loginData)
    // In a real app, you would authenticate with a backend here
    navigate("/dashboard")
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log("Signup submitted:", signupData)
    // Move to personal information page
    navigate("/personal-info", { state: { username: signupData.username } })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">P2P Lending Platform</CardTitle>
          <CardDescription>Login or create a new account</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <RadioGroup
                    defaultValue="user"
                    name="role"
                    value={loginData.role}
                    onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user">User</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">Admin</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input
                    id="signup-username"
                    name="username"
                    placeholder="Choose a username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
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
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default LoginPage
