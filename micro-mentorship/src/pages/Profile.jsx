import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import API from "../api/axios";

const Profile = ({ dark }) => {
  const user = getUser();
  const userId = user?.userId;

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    experienceYears: "",
    pricePerSession: "",
  });

  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    const res = await API.get(`/mentor/profile/${userId}`);
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    await API.put(`/mentor/profile/${userId}`, profile);
    setMessage("Profile Updated Successfully");
  };

  return (
    <div
      className={`p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-gray-900"
      }`}
    >
      <div
        className={`max-w-lg mx-auto p-8 rounded-2xl backdrop-blur-xl border transition ${
          dark
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-gray-200/50 shadow-md"
        }`}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 tracking-wide">
          Edit Profile ✨
        </h2>

        {/* Inputs */}
        <input
          className={`w-full mb-4 px-4 py-2 rounded-xl outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <textarea
          className={`w-full mb-4 px-4 py-2 rounded-xl outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        <input
          className={`w-full mb-4 px-4 py-2 rounded-xl outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          placeholder="Experience (years)"
          value={profile.experienceYears}
          onChange={(e) =>
            setProfile({
              ...profile,
              experienceYears: e.target.value,
            })
          }
        />

        <input
          className={`w-full mb-6 px-4 py-2 rounded-xl outline-none transition ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          placeholder="Price per session (₹)"
          value={profile.pricePerSession}
          onChange={(e) =>
            setProfile({
              ...profile,
              pricePerSession: e.target.value,
            })
          }
        />

        {/* Button */}
        <button
          onClick={handleUpdate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
        >
          Update Profile
        </button>

        {/* Success Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              dark ? "text-green-400" : "text-green-600"
            }`}
          >
            ✅ {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
