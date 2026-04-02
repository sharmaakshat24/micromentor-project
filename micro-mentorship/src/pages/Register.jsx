import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MENTEE",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered Successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Registration Failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .reg-root { font-family: 'Rajdhani', sans-serif; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) perspective(1000px) rotateX(0deg); }
          50% { transform: translateY(-10px) perspective(1000px) rotateX(1deg); }
        }

        @keyframes nebulaShift {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }

        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 25px rgba(0,220,255,0.5), 0 0 50px rgba(0,150,255,0.25), 0 0 80px rgba(80,0,255,0.15), inset 0 0 25px rgba(0,200,255,0.06); }
          50% { box-shadow: 0 0 40px rgba(0,220,255,0.75), 0 0 70px rgba(0,150,255,0.4), 0 0 110px rgba(80,0,255,0.25), inset 0 0 35px rgba(0,200,255,0.1); }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle var(--dur, 3s) ease-in-out infinite var(--del, 0s);
        }

        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          animation: nebulaShift 9s ease-in-out infinite;
          pointer-events: none;
        }

        .card-float {
          animation: floatCard 6s ease-in-out infinite;
        }

        .card-glow {
          animation: borderPulse 3s ease-in-out infinite;
        }

        .glass-back {
          position: absolute;
          top: 12px;
          right: -12px;
          width: 100%;
          height: 100%;
          background: rgba(0, 80, 180, 0.1);
          border: 1px solid rgba(0, 200, 255, 0.18);
          border-radius: 28px;
          backdrop-filter: blur(8px);
          z-index: 0;
        }

        .main-card {
          position: relative;
          z-index: 1;
          background: rgba(5, 25, 90, 0.55);
          border: 1.5px solid rgba(0, 220, 255, 0.45);
          border-radius: 26px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
        }

        .reg-input, .reg-select {
          width: 100%;
          background: rgba(0, 160, 255, 0.07);
          border: 1.5px solid rgba(0, 200, 255, 0.22);
          border-radius: 50px;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 12px rgba(0,0,0,0.35), 0 0 0 0 transparent;
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.4px;
          padding: 13px 20px;
        }

        .reg-input::placeholder {
          color: rgba(160, 210, 255, 0.65);
        }

        .reg-input:focus, .reg-select:focus {
          border-color: rgba(0, 240, 255, 0.75);
          background: rgba(0, 180, 255, 0.12);
          box-shadow: inset 0 2px 12px rgba(0,0,0,0.3), 0 0 18px rgba(0,220,255,0.35), 0 0 35px rgba(0,150,255,0.15);
        }

        .reg-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(0,220,255,0.8)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 18px center;
          padding-right: 48px;
          cursor: pointer;
        }

        .reg-select option {
          background: #0a1640;
          color: white;
        }

        .reg-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 50px;
          background: linear-gradient(135deg, #00f0ff 0%, #0055ff 35%, #7700ff 70%, #ff6600 100%);
          color: white;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 2.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0,160,255,0.6), 0 0 60px rgba(0,80,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .reg-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: shimmer 3s ease-in-out infinite;
        }

        .reg-btn:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 0 50px rgba(0,200,255,0.8), 0 0 90px rgba(80,0,255,0.5), 0 10px 30px rgba(0,0,0,0.4);
        }

        .floor-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(to top, rgba(0,120,255,0.18) 0%, transparent 100%);
          pointer-events: none;
        }

        .title-text {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          color: white;
          text-align: center;
          font-size: 26px;
          letter-spacing: 1px;
          text-shadow: 0 0 30px rgba(0,200,255,0.5), 0 0 60px rgba(0,100,255,0.3);
          margin-bottom: 28px;
        }

        .bottom-text {
          text-align: center;
          margin-top: 20px;
          color: rgba(150,200,255,0.75);
          font-size: 14px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .login-link {
          color: #00f0ff;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-shadow: 0 0 8px rgba(0,240,255,0.5);
        }

        .login-link:hover {
          text-shadow: 0 0 15px rgba(0,240,255,1);
          text-decoration: underline;
        }

        .inner-highlight {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.6), rgba(255,255,255,0.4), rgba(0,240,255,0.6), transparent);
          border-radius: 26px 26px 0 0;
        }

        .input-wrap { margin-bottom: 16px; }
        .input-wrap:last-of-type { margin-bottom: 22px; }
      `}</style>

      <div className="reg-root min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #010b1e 0%, #030d2a 30%, #08042a 65%, #010918 100%)' }}>

        {/* Stars */}
        {[...Array(90)].map((_, i) => {
          const size = Math.random() * 2.5 + 0.5;
          return (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              '--dur': `${Math.random() * 4 + 2}s`,
              '--del': `${Math.random() * 5}s`,
            }} />
          );
        })}

        {/* Nebulas */}
        <div className="nebula" style={{ width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(0,80,255,0.4) 0%, transparent 70%)', top: '-120px', left: '-80px' }} />
        <div className="nebula" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(80,0,200,0.35) 0%, transparent 70%)', bottom: '-100px', right: '-80px', animationDelay: '4s' }} />
        <div className="nebula" style={{ width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(0,180,255,0.2) 0%, transparent 70%)', top: '30%', left: '60%', animationDelay: '7s' }} />

        {/* Floor Glow */}
        <div className="floor-glow" />

        {/* Card Wrapper */}
        <div className="relative card-float" style={{ width: '100%', maxWidth: '420px', margin: '0 20px' }}>

          {/* Back Glass Layer */}
          <div className="glass-back" />

          {/* Main Card */}
          <div className="main-card card-glow p-9">
            {/* Inner top highlight */}
            <div className="inner-highlight" />

            {/* Title */}
            <div className="title-text">Create Account ✨</div>

            {/* Full Name */}
            <div className="input-wrap">
              <input
                className="reg-input"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="input-wrap">
              <input
                className="reg-input"
                placeholder="Email Address"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="input-wrap">
              <input
                type="password"
                className="reg-input"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* Role Dropdown */}
            <div className="input-wrap">
              <select
                className="reg-select"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="MENTEE">Mentee</option>
                <option value="MENTOR">Mentor</option>
              </select>
            </div>

            {/* Register Button */}
            <button className="reg-btn" onClick={handleRegister}>
              REGISTER 🚀
            </button>

            {/* Bottom Link */}
            <p className="bottom-text">
              Already have an account?{" "}
              <span className="login-link" onClick={() => navigate("/")}>Login Here</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
