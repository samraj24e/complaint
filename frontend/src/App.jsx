import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import DoctorPage from "./pages/DoctorPage";
import TherapistPage from "./pages/TherapistPage";
import PatientPage from "./pages/PatientPage";
import BillingPage from "./pages/BillingPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/therapist" element={<TherapistPage />} />
            <Route path="/patient" element={<PatientPage />} />
            <Route path="/billing" element={<BillingPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
