import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PersonalInfoPage from "./pages/PersonalInfoPage"
import VerificationPage from "./pages/VerificationPage"
import OtpVerificationPage from "./pages/OtpVerificationPage"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AccountApprovalPage from "./pages/admin/AccountApprovalPage"
import LoanApprovalPage from "./pages/admin/LoanApprovalPage"
import UserDetailsPage from "./pages/admin/UserDetailsPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/personal-info" element={<PersonalInfoPage />} />
          <Route path="/otp-verification" element={<OtpVerificationPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="/admin/account-approval" />} />
            <Route path="account-approval" element={<AccountApprovalPage />} />
            <Route path="loan-approval" element={<LoanApprovalPage />} />
          </Route>
          <Route path="/admin/user/:userId" element={<UserDetailsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
