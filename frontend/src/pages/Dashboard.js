"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react"

// Mock data for transactions
const MOCK_TRANSACTIONS = [
  {
    id: "1",
    type: "lend",
    amount: 25000,
    borrower: "Jane Smith",
    date: "2023-05-15",
    status: "active",
  },
  {
    id: "2",
    type: "borrow",
    amount: 10000,
    lender: "Michael Brown",
    date: "2023-05-10",
    status: "active",
  },
  {
    id: "3",
    type: "repayment",
    amount: 5000,
    lender: "Michael Brown",
    date: "2023-06-10",
    status: "completed",
  },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(50000)
  const [activeLoans, setActiveLoans] = useState(1)
  const [activeBorrowings, setActiveBorrowings] = useState(1)
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleViewAllTransactions = () => {
    navigate("/transactions")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName="John Doe" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Balance and Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
              <p className="text-xs text-muted-foreground">Available for lending</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLoans}</div>
              <p className="text-xs text-muted-foreground">Loans you've given</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Borrowings</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBorrowings}</div>
              <p className="text-xs text-muted-foreground">Loans you've taken</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Button variant="outline" size="sm" onClick={handleViewAllTransactions}>
              <BarChart2 className="h-4 w-4 mr-2" />
              View All Transactions
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">With</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center">
                            {transaction.type === "lend" ? (
                              <ArrowUpRight className="h-4 w-4 mr-2 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-2 text-red-500" />
                            )}
                            <span className="capitalize">{transaction.type}</span>
                          </div>
                        </td>
                        <td className="p-4 font-medium">
                          {transaction.type === "lend" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="p-4">{transaction.borrower || transaction.lender}</td>
                        <td className="p-4">{transaction.date}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              transaction.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-4 text-center text-muted-foreground">
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lending">Lending</TabsTrigger>
              <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Activity</CardTitle>
                  <CardDescription>View all your lending and borrowing activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    You have {activeLoans} active loans and {activeBorrowings} active borrowings.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="lending">
              <Card>
                <CardHeader>
                  <CardTitle>Lending Activity</CardTitle>
                  <CardDescription>View your lending activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You have lent a total of ₹25,000 across {activeLoans} active loans.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="borrowing">
              <Card>
                <CardHeader>
                  <CardTitle>Borrowing Activity</CardTitle>
                  <CardDescription>View your borrowing activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You have borrowed a total of ₹10,000 across {activeBorrowings} active borrowings.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
