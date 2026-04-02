import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    console.log("Theme:", dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        dark
          ? "bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#fdf4ff] text-black"
      }`}
    >
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        dark={dark}
        setDark={setDark}
      />

      <div className="flex">
        <Sidebar collapsed={collapsed} dark={dark} />
        <main className="flex-1 p-6">
          {React.cloneElement(children, { dark })}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
