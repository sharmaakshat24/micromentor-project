import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import SlotCard from "../components/SlotCard";
import { getUser } from "../utils/auth";

const MentorProfile = ({ dark }) => {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [reviews, setReviews] = useState([]);

  const user = getUser();
  const menteeId = user?.userId;

  const fetchReviews = async () => {
    const res = await API.get(`/feedback/mentor/${mentorId}`);
    setReviews(res.data);
  };

  const fetchMentor = async () => {
    const res = await API.get(`/mentor/profile/${mentorId}`);
    setMentor(res.data);
  };

  const fetchSlots = async () => {
    try {
      const res = await API.get(`/slots/mentor/${mentorId}`);
      setSlots(res.data);
    } catch (error) {
      console.error("Error fetching slots: ", error);
    }
  };

  useEffect(() => {
    fetchMentor();
    fetchSlots();
    fetchReviews();
  }, []);

  const bookSlot = async (slotId) => {
    await API.post("/booking", {
      mentorId: mentor.user.id,
      menteeId: menteeId,
      slotId: slotId,
    });

    alert("Slot Booked");

    fetchSlots();
  };

  if (!mentor) return <p>Loading...</p>;

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      <div
        className={`p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-6 backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <img
          src={mentor.photoUrl || "https://i.pravatar.cc/120"}
          className="w-24 h-24 rounded-full object-cover border-4 border-[#8B5CF6]/30"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{mentor.name}</h1>

          <p className="text-gray-600 mt-1 opacity-70">
            {mentor.experienceYears} Years Experience
          </p>

          <p className="mt-2 font-medium">
            ₹ {mentor.pricePerSession} / session
          </p>

          <p className="text-yellow-400 font-semibold mt-1">
            ⭐ {mentor.rating || "4.5"}
          </p>

          <p className="mt-3 text-sm opacity-80">{mentor.bio}</p>
        </div>

        <button
          onClick={() => {
            if (mentor.id === menteeId) {
              alert("You cannot message yourself");
              return;
            }
            navigate(`/chat/${mentor.id}`);
          }}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-medium shadow-md hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
        >
          💬 Message
        </button>
      </div>

      <div
        className={`p-6 rounded-2xl mb-8 backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Reviews ⭐</h2>
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <div className="text-4xl mb-2">⭐</div>
            <p>No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className={`p-4 rounded-xl ${
                  dark ? "bg-white/10" : "bg-gray-100"
                }`}
              >
                <p className="text-yellow-400 font-medium">⭐ {r.rating}</p>
                <p className="text-sm mt-1 opacity-80">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Available Slots</h2>

        {slots.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No slots available
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                onBook={bookSlot}
                dark={dark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;
