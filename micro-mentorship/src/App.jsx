import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MentorList from "./pages/MentorList";
import MentorProfile from "./pages/MentorProfile";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Feedback from "./pages/Feedback";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Slots from "./pages/Slots";
import Earnings from "./pages/Earnings";
import MyBookings from "./pages/MyBookings";
import ChatPage from "./pages/ChatPage";
import Chats from "./pages/Chats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MentorList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor/:mentorId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MentorProfile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback/:bookingId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Feedback />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/slots"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Slots />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/earnings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Earnings />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyBookings />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:userId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/chat/:mentorId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatPage />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chats />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
