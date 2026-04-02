import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import API from "../api/axios";

const Chats = ({ dark }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const userId = getUser()?.userId;

  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await API.get(`/chat/conversations/${userId}`);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) loadChats();
  }, [userId]);

  return (
    <div className="flex h-[80vh]">
      <div
        className={`w-1/3 p-4 overflow-y-auto rounded-2xl border backdrop-blur-xl ${
          dark
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white/80 border-gray-200/50 shadow-md text-gray-800"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Chats</h2>

        {users.length === 0 ? (
          <p className="text-gray-400">No conversations yet</p>
        ) : (
          users.map((u) => (
            <div
              key={u.id}
              onClick={() => {
                if (u.id === userId) return;
                navigate(`/chat/${u.id}`);
              }}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                dark
                  ? "hover:bg-white/10 border-b border-white/10"
                  : "hover:bg-purple-50 border-b border-gray-200"
              }`}
            >
              {u.name || u.email}
            </div>
          ))
        )}
      </div>

      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    </div>
  );
};

export default Chats;
