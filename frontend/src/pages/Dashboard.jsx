"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">P2P Lending Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>Your current account status</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a placeholder for the dashboard content. In a real application, this would show the user's
                account information, current loans, and other relevant data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lending Opportunities</CardTitle>
              <CardDescription>Available lending options</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a placeholder for lending opportunities. In a real application, this would show available
                borrowers, interest rates, and risk assessments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Borrowing Options</CardTitle>
              <CardDescription>Available loan options</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is a placeholder for borrowing options. In a real application, this would show available loan
                amounts, interest rates, and repayment terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
