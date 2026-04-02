import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import API from "../api/axios";

const Slots = ({ dark }) => {
  const user = getUser();
  const mentorId = user?.userId;

  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const slotsPerPage = 5;

  const indexOfLast = currentPage * slotsPerPage;
  const indexOfFirst = indexOfLast - slotsPerPage;

  const currentSlots = slots.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(slots.length / slotsPerPage);

  const fetchSlots = async () => {
    const res = await API.get(`/slots/mentor/${mentorId}`);
    setSlots(res.data);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const createSlot = async () => {
    try {
      if (newSlot.startTime >= newSlot.endTime) {
        alert("End time must be after start time");
        return;
      }
      const [date1, time1] = newSlot.startTime.split("T");
      const [, time2] = newSlot.endTime.split("T");

      await API.post("/slots/create", {
        mentorId,
        date: date1,
        startTime: time1,
        endTime: time2,
      });
      fetchSlots();
    } catch (err) {
      console.error("Create slot error:", err);
    }
  };

  const deleteSlot = async (id) => {
    await API.delete(`/slots/${id}`);
    fetchSlots();
  };

  return (
    <div
      className={`p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 tracking-wide">Slot Management</h1>

      {/* create slot  */}
      <div
        className={`p-6 rounded-2xl mb-6 backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <h2 className="font-bold mb-3">Create New Slot</h2>

        <input
          type="datetime-local"
          className={`p-2 mr-3 rounded-lg outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 transition"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          onChange={(e) =>
            setNewSlot({ ...newSlot, startTime: e.target.value })
          }
        />

        <input
          type="datetime-local"
          className={`p-2 mr-3 rounded-lg outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 transition"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          onChange={(e) => {
            setNewSlot({ ...newSlot, endTime: e.target.value });
          }}
        />

        <button
          onClick={createSlot}
          className="px-5 py-2 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] text-white font-medium shadow-md hover:scale-105 transition-all"
        >
          Create Slot
        </button>
      </div>

      {/* slot list  */}
      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <h2 className="font-bold mb-3 ">Your Slots</h2>

        {slots.length === 0 ? (
          <p>No slots created yet</p>
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
                    <th className="p-3">Slot ID</th>
                    <th className="p-3">Start Time</th>
                    <th className="p-3">End Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentSlots.map((slot) => (
                    <tr
                      key={slot.id}
                      className={`border-b transition ${
                        dark ? "hover:bg-white/5" : "hover:bg-purple-50"
                      }`}
                    >
                      <td className="p-3 font-medium">{slot.id}</td>
                      <td className="p-3">{slot.startTime}</td>
                      <td className="p-3">{slot.endTime}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            dark
                              ? "bg-green-500/20 text-green-400"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          Available
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteSlot(slot.id)}
                          className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105 transition"
                        >
                          Delete
                        </button>
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
                Page {currentPage}/{totalPages}
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

export default Slots;
