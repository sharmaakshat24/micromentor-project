import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import StarRating from "../components/StarRating";

const Feedback = () => {
  const { bookingId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const submitFeedback = async () => {
    await API.post("/feedback", {
      bookingId: bookingId,
      rating: rating,
      comment: comment,
    });
    alert("Feedback Submitted");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Give Feedback</h2>

        <StarRating rating={rating} setRating={setRating} />

        <textarea
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Write your review..."
          className="border w-full p-2 mt-4 rounded"
        />

        <button
          onClick={submitFeedback}
          className="bg-blue-500 text-white w-full mt-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
