import React from "react";
import { useNavigate } from "react-router-dom";

const MentorCard = ({ mentor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      {/* Mentor Image */}
      <div className="flex items-center gap-4">
        <img
          src={mentor.photoUrl || "https://i.pravatar.cc/100"}
          alt="mentor"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-lg">{mentor.name}</h2>

          <p className="text-gray-500 text-sm">
            {mentor.experienceYears} Years Experience
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700 font-semibold">
          {" "}
          ₹{mentor.pricePerSession}
        </p>
        <p className="text-yellow-500 font-medium">⭐ {mentor.rating}</p>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate(`/mentor/${mentor.mentorId}`)}
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90"
      >
        View Profile
      </button>
    </div>
  );
};

export default MentorCard;
