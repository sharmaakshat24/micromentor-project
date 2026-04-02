import { useEffect, useState } from "react";
import API from "../api/axios";
import MentorCard from "../components/MentorCard";

const MentorList = ({ dark }) => {
  const [mentors, setMentors] = useState([]);
  const [filters, setFilters] = useState({
    skillId: null,
    maxPrice: "",
    minRating: "",
  });

  //fetch mentors
  const fetchMentors = async () => {
    const res = await API.get(`/search/mentors`, {
      params: {
        skillId: filters.skillId || null,
        maxPrice: filters.maxPrice || null,
        minRating: filters.minRating || null,
      },
    });
    setMentors(res.data);
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        Find Your Mentor
      </h1>

      {/* Filters */}
      <div
        className={`p-5 rounded-2xl mb-8 flex flex-wrap gap-4 items-center backdrop-blur-xl border ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        <input
          type="number"
          placeholder="Max Price ₹"
          className={`px-4 py-2 rounded-xl outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          onChange={(e) => {
            setFilters({
              ...filters,
              maxPrice: e.target.value,
            });
          }}
        />

        <input
          type="number"
          placeholder="Min Rating"
          className={`px-4 py-2 rounded-xl outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          onChange={(e) => {
            setFilters({
              ...filters,
              minRating: e.target.value,
            });
          }}
        />

        <button
          onClick={fetchMentors}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-medium shadow-md hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
        >
          Apply Filters
        </button>
      </div>

      {/* Mentor Grid */}

      {mentors.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
          <div className="text-6xl mb-4">🧑‍🏫</div>
          <p className="text-lg font-medium">No mentors found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.mentorId} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorList;
