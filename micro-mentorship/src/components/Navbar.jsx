import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import API from "../api/axios";
import { Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";

const Navbar = ({ collapsed, setCollapsed, dark, setDark }) => {
  const navigate = useNavigate();

  const user = getUser();
  const userId = user?.userId;

  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/notifications/${userId}`);

        setNotifications(res.data);
      } catch {}
    };

    if (userId) load();
  }, []);

  return (
    <div
      className={`backdrop-blur-xl px-6 py-4 flex justify-between items-center 
border-b transition-all duration-300 ${
        dark
          ? "bg-white/5 border-white/10 text-white"
          : "bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-sm text-gray-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <Menu
          size={26}
          className="cursor-pointer hover:text-[#22D3EE]"
          onClick={() => setCollapsed(!collapsed)}
        />
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-2xl">🚀 </span>
          <span className="font-bold text-lg bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-transparent bg-clip-text">
            MicroMentor
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setDark(!dark)}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
            dark
              ? "bg-white/10 hover:bg-white/20 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <NotificationBell />

        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white flex items-center justify-center font-bold">
          {user?.role?.charAt(0)}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
