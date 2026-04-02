import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import API from "../api/axios";

const Earnings = ({ dark }) => {
  const user = getUser();
  const mentorId = user?.userId;

  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const historyPerPage = 5;

  const indexOfLast = currentPage * historyPerPage;
  const indexOfFirst = indexOfLast - historyPerPage;

  const currentHistory = history.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(history.length / historyPerPage);

  const fetchTotal = async () => {
    const res = await API.get(`/booking/mentor/${mentorId}/earnings`);
    setTotal(res.data);
  };

  const fetchHistory = async () => {
    const res = await API.get(`/booking/mentor/${mentorId}/earnings/history`);
    setHistory(res.data);
  };

  useEffect(() => {
    fetchTotal();
    fetchHistory();
  }, []);

  return (
    <div
      className={`p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      <div className="text-3xl font-bold mb-6 transition-wide">
        Earnings Dashboard
      </div>

      <div
        className={`relative p-6 rounded-2xl mb-6 overflow-hidden ${
          dark
            ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] shadow-[0_0_40px_rgba(139,92,246,0.4)] text-white"
            : "bg-gradient-to-r from-[#6366F1] to-[#a78bfa] text-white shadow-md"
        }`}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent)]"></div>
        <p className="opacity-80">Total Earnings</p>

        <h2 className="text-4xl font-bold mt-2">₹ {total}</h2>
      </div>

      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Earnings History</h2>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="text-5xl mb-3">
              <p className="text-lg font-medium">No earnings yet</p>
              <p className="text-sm">Start session to earn money</p>
            </div>
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
                    <th className="p-3">Session</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {currentHistory.map((b) => (
                    <tr
                      key={b.id}
                      className={`border-b transition ${
                        dark ? "hover:bg-white/5" : "hover:bg-purple-50"
                      }`}
                    >
                      <td className="p-3 font-medium">#{b.id}</td>

                      <td className="p-3">{b.date || "12 Mar"}</td>

                      <td className="p-3">{b.duration || "30 min"}</td>

                      <td
                        className={`p-3 font-bold ${
                          dark ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        ₹ {b.price}
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

export default Earnings;
