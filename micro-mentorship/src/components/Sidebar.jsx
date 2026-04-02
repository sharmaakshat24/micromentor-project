import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  User,
  Users,
  BookOpen,
  MessageCircle,
} from "lucide-react";

const Sidebar = ({ collapsed, dark }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getUser();
  const role = user?.role;

  const Item = ({ path, icon: Icon, label }) => {
    const active = location.pathname === path;

    return (
      <button
        onClick={() => navigate(path)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition
        ${
          active
            ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white shadow-[0_0_20px_rgba(34,211,238,0.6)] cursor-pointer"
            : `${
                dark
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-blue-50 text-gray-600"
              }`
        }`}
      >
        <Icon size={20} />
        {!collapsed && label}
      </button>
    );
  };

  return (
    <div
      className={`${collapsed ? "w-22" : "w-55"} sticky top-0 
backdrop-blur-xl border-r transition-all duration-300 ease-in-out ${
        dark
          ? "bg-[#0F172A]/80 border-white/10 text-white backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-sm text-gray-800"
      }
flex flex-col p-4`}
    >
      <div className="flex flex-col gap-2">
        <Item path="/dashboard" icon={LayoutDashboard} label="Dashboard" />

        {role === "MENTEE" && (
          <>
            <Item path="/mentors" icon={Users} label="Find Mentors" />
            <Item path="/bookings" icon={BookOpen} label="My Bookings" />
            <Item path="/chats" icon={MessageCircle} label="Chats" />
          </>
        )}

        {role === "MENTOR" && (
          <>
            <Item path="/slots" icon={Calendar} label="My Slots" />
            <Item path="/earnings" icon={DollarSign} label="Earnings" />
            <Item path="/chats" icon={MessageCircle} label="Chats" />
            <Item path="/profile" icon={User} label="Profile" />
          </>
        )}
      </div>

      <div className="mt-auto text-xs text-gray-400 dark:text-gray-500">
        © 2026 MicroMentor
      </div>
    </div>
  );
};

export default Sidebar;
