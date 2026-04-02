import React from "react";

const SlotCard = ({ slot, onBook }) => {
  return (
    <div
      className={`p-3 rounded-lg text-center cursor-pointer
      ${
        slot.booked
          ? "bg-gray-300"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
      onClick={() => !slot.booked && onBook(slot.id)}
    >
      <p>
        {slot.startTime} - {slot.endTime}
      </p>

      {slot.booked && <p className="text-sm">Booked</p>}
    </div>
  );
};

export default SlotCard;
