import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { getUser } from "../utils/auth";

let stompClient = null;

const ChatPage = ({ dark }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);

  const { userId } = useParams();
  const senderId = getUser()?.userId;
  const receiverId = userId ? Number(userId) : null;

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/chat");
    stompClient = Stomp.over(socket);

    stompClient.debug = () => {};

    stompClient.connect({}, () => {
      console.log("WebSocket connected");
      setConnected(true);
      stompClient.subscribe("/topic/messages", (msg) => {
        const newMsg = JSON.parse(msg.body);

        if (
          (newMsg.senderId === senderId && newMsg.receiverId === receiverId) ||
          (newMsg.senderId === receiverId && newMsg.receiverId === senderId)
        ) {
          setMessages((prev) => [...prev, newMsg]);
        }
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [senderId, receiverId]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await API.get(
          `/chat/history?user1=${senderId}&user2=${receiverId}`,
        );
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    if (senderId && receiverId !== null) {
      loadHistory();
    }
  }, [senderId, receiverId]);

  const sendMessage = () => {
    console.log("Sender:", senderId);
    console.log("Receiver:", receiverId);

    if (senderId === receiverId) {
      alert("you cannot chat with yourself");
      return;
    }

    if (!connected) {
      alert("Chat is still connecting");
      return;
    }

    if (!message.trim()) return;

    const newMsg = {
      senderId,
      receiverId,
      message,
    };

    stompClient.send("/app/send", {}, JSON.stringify(newMsg));
    setMessage("");
  };

  return (
    <div
      className={`flex flex-col h-[80vh] rounded-2xl border backdrop-blur-xl ${
        dark
          ? "bg-white/5 border-white/10 text-white"
          : "bg-white/80 border-gray-200/50 shadow-md text-gray-800"
      }`}
    >
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2 ${
          dark ? "bg-transparent" : "bg-gray-50"
        }`}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${
              m.senderId === senderId
                ? dark
                  ? "ml-auto bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white"
                  : "ml-auto bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white"
                : dark
                  ? "bg-white/10 text-white"
                  : "bg-gray-200 text-gray-800"
            }`}
          >
            {m.message}
          </div>
        ))}
      </div>

      <div
        className={`flex gap-2 p-3 border-t ${
          dark ? "border-white/10" : "border-gray-200"
        }`}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`flex-1 rounded-xl px-4 py-2 outline-none ${
            dark
              ? "bg-white/10 border border-white/10 text-white placeholder-gray-400"
              : "bg-white border border-gray-300 text-gray-800"
          }`}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white font-medium hover:scale-105 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
