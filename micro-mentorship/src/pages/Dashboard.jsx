import React, { useEffect, useState } from "react";
import API from "../api/axios";
import BookingCard from "../components/BookingCard";
import { getUser } from "../utils/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ dark }) => {
  const user = getUser();
  const userId = user?.userId;
  const role = user?.role;

  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [analytics, setAnalytics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 5;

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;

  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    if (!userId) return;

    if (role === "MENTEE") {
      const res = await API.get(`/booking/mentee/${userId}`);
      setBookings(res.data);
    } else {
      const res = await API.get(`/booking/mentor/${userId}`);
      setBookings(res.data);
    }
  };

  const fetchAnalytics = async () => {
    const res = await API.get(`/booking/analytics/${userId}/${role}`);
    setAnalytics(res.data);
  };

  const confirmBooking = async (id) => {
    await API.put(`/booking/${id}/confirm`);
    fetchBookings();
  };

  const completeBooking = async (id) => {
    await API.put(`/booking/${id}/complete`);
    fetchBookings();
  };

  const cancelBooking = async (id) => {
    await API.put(`/booking/${id}/cancel`);
    fetchBookings();
  };

  const fetchEarnings = async () => {
    if (role === "MENTOR") {
      const res = await API.get(`/booking/mentor/${userId}/earnings`);
      setEarnings(res.data);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchEarnings();
    fetchAnalytics();
  }, []);

  const completed = bookings.filter((b) => b.status === "COMPLETED").length;

  const greeting =
    new Date().getHours() < 12
      ? "GOOD MORNING"
      : new Date().getHours() < 18
        ? "GOOD AFTERNOON"
        : "GOOD EVENING";

  const growth = bookings.length > 5 ? "+12%" : "+3%";

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent)]"></div>
        <h1 className="text-3xl font-bold">
          {greeting}, {role}
        </h1>

        <p className="mt-2">Welcome to your dashboard</p>
      </div>

      {/* quick actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* mentee action */}
        {role === "MENTEE" && (
          <button
            onClick={() => navigate("/mentors")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 active:scale-95"
          >
            ➕ Book New Session
          </button>
        )}

        {/* mentor action  */}
        {role === "MENTOR" && (
          <>
            <button
              onClick={() => navigate("/slots")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 active:scale-95"
            >
              ➕ Create Slot
            </button>

            <button
              onClick={() => navigate("/earnings")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 active:scale-95"
            >
              💰 View Earnings
            </button>
          </>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* total sessions */}
        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl p-6 hover:-translate-y-1 hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Sessions</p>
              <h2 className="text-3xl font-bold mt-1">{bookings.length}</h2>
              <p className="text-xs mt-2 opacity-80">↑ {growth} this week</p>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white shadow-lg">
              📅
            </div>
          </div>
        </div>

        {/* completed */}
        <div className="relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl p-6 hover:-translate-y-1 hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Completed Sessions</p>
              <h2 className="text-3xl font-bold mt-1">{completed}</h2>
              <p className="text-xs mt-2 opacity-80">
                ↑ Productivity improving
              </p>
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white shadow-lg">
              ✅
            </div>
          </div>
        </div>

        {/* earnings */}
        {role === "MENTOR" && (
          <div className="relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl hover:-translate-y-1  p-6 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">Total Earnings</p>
                <h2 className="text-3xl font-bold mt-1"> ₹ {earnings}</h2>
                <p className="text-xs mt-2 opacity-80">↑ Revenue growing</p>
              </div>

              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white shadow-lg">
                💰
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No sessions yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/70 text-left text-white/80">
                    <th className="p-3">Booking</th>
                    {role === "MENTEE" && <th className="p-3">Mentor</th>}
                    {role === "MENTOR" && <th className="p-3">Mentee</th>}
                    <th className="p-3">Slot</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Meeting</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b hover:bg-white/5 transition"
                    >
                      <td className="p-3 font-medium">#{b.id}</td>
                      {role === "MENTEE" && (
                        <td className="p-3">{b.mentorId}</td>
                      )}
                      {role === "MENTOR" && (
                        <td className="p-3">{b.menteeId}</td>
                      )}
                      <td className="p-3">#{b.slotId}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold
  ${b.status === "COMPLETED" && "bg-green-500/20 text-green-400"}
  ${b.status === "CONFIRMED" && "bg-blue-500/20 text-blue-400"}
  ${b.status === "CANCELLED" && "bg-red-500/20 text-red-400"}
  ${b.status === "PENDING" && "bg-yellow-500/20 text-yellow-400"}
`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <a
                          href={b.meetingLink}
                          target="_blank"
                          className="text-blue-500 underline"
                        >
                          Join
                        </a>
                      </td>

                      <td className="p-3 flex gap-2 flex-wrap">
                        {role === "MENTOR" && b.status === "PENDING" && (
                          <button
                            onClick={() => confirmBooking(b.id)}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:scale-105 transition"
                          >
                            Confirm
                          </button>
                        )}

                        {role === "MENTOR" && b.status === "CONFIRMED" && (
                          <button
                            onClick={() => completeBooking(b.id)}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:scale-105 transition"
                          >
                            Completed
                          </button>
                        )}

                        {role === "MENTEE" && b.status === "PENDING" && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:scale-105 transition"
                          >
                            Cancel
                          </button>
                        )}

                        {b.status === "COMPLETED" && (
                          <button
                            onClick={() => navigate(`/feedback/${b.id}`)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Feedback
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-white/70 text-white hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#22D3EE] rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2 font-semibold">
                Page {currentPage}/{totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-white/70 text-white hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#22D3EE] rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Analytics Chart   */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl backdrop-blur-xl p-6 rounded-2xl shadow-xl mt-8">
        <h2 className="text-xl font-bold mb-4">Weekly Session Trend</h2>

        {analytics.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            <div className="flex flex-col items-center justify-center text-white/60">
              <div className="text-5xl mb-3">📊</div>
              <p className="text-lg font-medium">No analytics yet</p>
              <p className="text-sm">Start sessions to see trends</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                labelStyle={{ color: "#a5b4fc" }}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#22D3EE"
                strokeWidth={4}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
