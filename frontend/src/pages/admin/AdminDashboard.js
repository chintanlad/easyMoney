"use client"

import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { UserCircle, LogOut } from "lucide-react"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <UserCircle className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-xl font-bold text-gray-900">P2P Lending Admin</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="account-approval" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger
              value="account-approval"
              className={isActive("/admin/account-approval") ? "data-[state=active]" : ""}
              onClick={() => navigate("/admin/account-approval")}
            >
              Account Approval
            </TabsTrigger>
            <TabsTrigger
              value="loan-approval"
              className={isActive("/admin/loan-approval") ? "data-[state=active]" : ""}
              onClick={() => navigate("/admin/loan-approval")}
            >
              Loan Approval
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
