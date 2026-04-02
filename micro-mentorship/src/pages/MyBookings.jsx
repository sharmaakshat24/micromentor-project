import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const MyBookings = ({ dark }) => {
  const user = getUser();
  const menteeId = user?.userId;

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 5;

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;

  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const fetchBookings = async () => {
    const res = await API.get(`/booking/mentee/${menteeId}`);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    await API.put(`/booking/${id}/cancel`);
    fetchBookings();
  };

  return (
    <div
      className={`p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 tracking-wide">My Bookings</h1>

      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-lg font-medium">No bookings yet</p>
            <p className="text-sm">Start booking sessions</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr
                    className={`text-left ${
                      dark
                        ? "bg-white/10 text-white/80"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <th className="p-3">Booking</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentBookings.map((b) => (
                    <tr
                      key={b.id}
                      className={`border-b transition ${
                        dark ? "hover:bg-white/5" : "hover:bg-purple-50"
                      }`}
                    >
                      <td className="p-3 font-medium">#{b.id}</td>

                      <td className="p-3">₹ {b.price}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-semibold
                  ${
                    b.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400"
                      : b.status === "CONFIRMED"
                        ? "bg-blue-500/20 text-blue-400"
                        : b.status === "CANCELLED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                  }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td className="p-3">
                        {b.status === "PENDING" && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-3 py-1 rounded-lg text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105 transition"
                          >
                            Cancel
                          </button>
                        )}

                        {b.status === "COMPLETED" && (
                          <button
                            onClick={() => navigate(`/feedback/${b.id}`)}
                            className="px-3 py-1 rounded-lg text-xs bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white hover:scale-105 transition"
                          >
                            Feedback
                          </button>
                        )}

                        {(b.status === "CONFIRMED" ||
                          b.status === "CANCELLED") && (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded-lg transition ${
                  dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-gray-100 text-gray-800 hover:bg-purple-100"
                }`}
              >
                Prev
              </button>

              <span className="px-4 py-2 font-semibold">
                Page {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded-lg transition ${
                  dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-gray-100 text-gray-800 hover:bg-purple-100"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
