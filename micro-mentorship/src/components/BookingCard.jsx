import React from "react";
import { useNavigate } from "react-router-dom";

const BookingCard = ({
  booking,
  role,
  confirmBooking,
  completeBooking,
  cancelBooking,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold">Booking #{booking.id}</h2>

      <p className="text-gray-600">Mentor ID: {booking.mentorId}</p>

      <p className="text-gray-600">Slot ID: {booking.slotId}</p>

      <div className="flex items-center justify-between mt-2">
        <p
          className={
            booking.status === "COMPLETED"
              ? "text-green-600 font-semibold"
              : booking.status === "CONFIRMED"
                ? "text-blue-600 font-semibold"
                : booking.status === "CANCELLED"
                  ? "text-red-600 font-semibold"
                  : "text-yellow-600 font-semibold"
          }
        >
          {booking.status}
        </p>

        {/* Mentor Actions */}
        {role === "MENTOR" && booking.status === "PENDING" && (
          <button
            onClick={() => confirmBooking(booking.id)}
            className="ml-3 text-sm bg-blue-500 text-white px-3 py-1 rounded"
          >
            Confirm
          </button>
        )}

        {role === "MENTOR" && booking.status === "CONFIRMED" && (
          <button
            onClick={() => completeBooking(booking.id)}
            className="ml-3 text-sm bg-green-500 text-white px-3 py-1 rounded"
          >
            Mark Complete
          </button>
        )}

        {/* Mentee Action */}
        {role === "MENTEE" && booking.status === "PENDING" && (
          <button
            onClick={() => cancelBooking(booking.id)}
            className="ml-3 text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      <a
        href={booking.meetingLink}
        target="_blank"
        className="text-blue-500 underline"
      >
        Join Meeting
      </a>

      <button
        onClick={() => navigate(`/feedback/${booking.id}`)}
        className="block mt-3 bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Give Feedback
      </button>
    </div>
  );
};

export default BookingCard;
