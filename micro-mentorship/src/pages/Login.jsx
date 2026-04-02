import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Enter valid email");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .login-root {
          font-family: 'Rajdhani', sans-serif;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes nebulaShift {
          0%, 100% { opacity: 0.4; transform: scale(1) translate(0,0); }
          50% { opacity: 0.7; transform: scale(1.1) translate(10px, -10px); }
        }

        @keyframes scanline {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.2), inset 0 0 20px rgba(0,255,255,0.05); }
          50% { box-shadow: 0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(0,255,255,0.4), 0 0 90px rgba(100,0,255,0.2), inset 0 0 30px rgba(0,255,255,0.1); }
        }

        @keyframes videoCallPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,255,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(0,255,255,0); }
        }

        @keyframes waveform {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }

        @keyframes recordingBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle var(--duration, 3s) ease-in-out infinite var(--delay, 0s);
        }

        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: nebulaShift 8s ease-in-out infinite;
        }

        .floating-card {
          animation: float 6s ease-in-out infinite;
        }

        .login-panel {
          animation: floatCard 5s ease-in-out infinite;
        }

        .glow-border {
          animation: borderGlow 3s ease-in-out infinite;
        }

        .scanline-effect::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
          animation: scanline 4s linear infinite;
          pointer-events: none;
        }

        .input-field {
          background: rgba(0, 200, 255, 0.05);
          border: 1px solid rgba(0, 255, 255, 0.25);
          border-radius: 50px;
          color: white;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.3), 0 0 0 0 rgba(0,255,255,0);
        }

        .input-field::placeholder {
          color: rgba(180, 220, 255, 0.6);
        }

        .input-field:focus {
          border-color: rgba(0,255,255,0.8);
          background: rgba(0, 200, 255, 0.1);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(0,255,255,0.1);
        }

        .login-btn {
          background: linear-gradient(135deg, #00f5ff 0%, #0066ff 35%, #7700ff 70%, #ff6600 100%);
          border: none;
          border-radius: 50px;
          color: white;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 30px rgba(0,150,255,0.6), 0 0 60px rgba(0,100,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
          position: relative;
          overflow: hidden;
        }

        .login-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .login-btn:hover::before {
          left: 100%;
        }

        .login-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 0 50px rgba(0,200,255,0.8), 0 0 80px rgba(100,0,255,0.5), 0 0 120px rgba(0,100,255,0.3);
        }

        .social-btn {
          background: rgba(0, 150, 255, 0.08);
          border: 1px solid rgba(0, 200, 255, 0.2);
          border-radius: 14px;
          color: rgba(180, 220, 255, 0.9);
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .social-btn:hover {
          background: rgba(0, 200, 255, 0.15);
          border-color: rgba(0, 255, 255, 0.5);
          box-shadow: 0 0 20px rgba(0,200,255,0.25);
          transform: translateY(-2px);
        }

        .video-call-card {
          background: rgba(0, 20, 60, 0.7);
          border: 1px solid rgba(0, 255, 255, 0.4);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(0,100,255,0.2), 0 25px 50px rgba(0,0,0,0.5);
          overflow: hidden;
          position: relative;
        }

        .bar {
          width: 3px;
          background: #00f5ff;
          border-radius: 2px;
          animation: waveform 0.8s ease-in-out infinite;
        }

        .recording-dot {
          animation: recordingBlink 1.5s ease-in-out infinite;
        }

        .glass-panel-back {
          position: absolute;
          top: 10px; right: -10px;
          width: 100%; height: 100%;
          background: rgba(0, 100, 200, 0.08);
          border: 1px solid rgba(0, 200, 255, 0.15);
          border-radius: 28px;
          backdrop-filter: blur(5px);
          z-index: 0;
        }

        .main-login-card {
          position: relative;
          z-index: 1;
          background: rgba(0, 20, 80, 0.55);
          border: 1px solid rgba(0, 220, 255, 0.4);
          border-radius: 24px;
          backdrop-filter: blur(30px);
          box-shadow: 0 0 40px rgba(0,200,255,0.4), 0 0 80px rgba(50,0,200,0.3), 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .logo-text {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          background: linear-gradient(135deg, #00f5ff 0%, #0066ff 50%, #8800ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(0,200,255,0.5));
        }

        .welcome-text {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
        }

        .floor-reflection {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to top, rgba(0,100,255,0.15) 0%, transparent 100%);
          pointer-events: none;
        }

        .link-text {
          color: rgba(100, 200, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .link-text:hover {
          color: #00f5ff;
          text-shadow: 0 0 10px rgba(0,245,255,0.8);
        }

        .link-accent {
          color: #00f5ff;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.2s;
        }

        .link-accent:hover {
          text-shadow: 0 0 15px rgba(0,245,255,1);
        }
      `}</style>

      <div className="login-root h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #010b1f 0%, #020d2e 30%, #0a0520 60%, #010815 100%)' }}>

        {/* Stars */}
        {[...Array(80)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2.5 + 0.5}px`,
            height: `${Math.random() * 2.5 + 0.5}px`,
            '--duration': `${Math.random() * 4 + 2}s`,
            '--delay': `${Math.random() * 4}s`,
          }} />
        ))}

        {/* Nebula Effects */}
        <div className="nebula" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,100,255,0.35) 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
        <div className="nebula" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(100,0,255,0.3) 0%, transparent 70%)', bottom: '-150px', right: '-150px', animationDelay: '3s' }} />
        <div className="nebula" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,200,255,0.2) 0%, transparent 70%)', top: '40%', left: '40%', animationDelay: '5s' }} />

        {/* Floor Reflection */}
        <div className="floor-reflection" />

        {/* Left Side */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-12 relative z-10">
          <div className="flex flex-col items-start gap-8 max-w-lg w-full">

            {/* Video Call Card */}
            <div className="floating-card video-call-card w-full scanline-effect" style={{ maxWidth: '420px' }}>
              {/* Card Header Bar */}
              <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(0,50,120,0.5)', borderBottom: '1px solid rgba(0,255,255,0.15)' }}>
                <div className="flex items-center gap-2">
                  <div className="recording-dot w-2 h-2 rounded-full bg-red-400" />
                  <span style={{ color: 'rgba(150,220,255,0.8)', fontSize: '11px', fontFamily: 'Rajdhani', letterSpacing: '1px' }}>LIVE SESSION</span>
                </div>
                <div className="flex items-center gap-1" style={{ color: 'rgba(0,255,255,0.7)', fontSize: '11px', fontFamily: 'Rajdhani' }}>
                  <span>⏱</span>
                  <span>15:00</span>
                </div>
              </div>

              {/* Video Area */}
              <div className="relative" style={{ height: '200px', background: 'linear-gradient(135deg, #0a1628 0%, #1a0a2e 100%)' }}>
                {/* Main video (mentor) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl" style={{ background: 'linear-gradient(135deg, #0044aa, #6600aa)', border: '2px solid rgba(0,255,255,0.5)', boxShadow: '0 0 20px rgba(0,255,255,0.3)' }}>
                    👨‍💼
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs" style={{ color: 'rgba(0,255,255,0.9)', fontFamily: 'Rajdhani', letterSpacing: '0.5px' }}>
                    Alex Johnson · Senior Engineer
                  </div>
                </div>
                {/* Small video (mentee) */}
                <div className="absolute top-3 right-3 w-16 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #002266, #330066)', border: '1px solid rgba(0,255,255,0.3)', boxShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
                  👨‍💻
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between px-5 py-3" style={{ background: 'rgba(0,30,80,0.6)' }}>
                {/* Waveform */}
                <div className="flex items-center gap-1" style={{ height: '20px' }}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s`, animationDuration: `${0.5 + Math.random() * 0.5}s` }} />
                  ))}
                </div>
                {/* Control buttons */}
                <div className="flex items-center gap-2">
                  {['🎙️', '📷', '🔇', '⚙️'].map((icon, i) => (
                    <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(0,100,200,0.3)', border: '1px solid rgba(0,200,255,0.2)', cursor: 'pointer' }}>
                      {icon}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(255,50,50,0.3)', border: '1px solid rgba(255,100,100,0.4)', cursor: 'pointer' }}>
                    📵
                  </div>
                </div>
                <div style={{ color: 'rgba(0,255,180,0.8)', fontSize: '11px', fontFamily: 'Rajdhani', fontWeight: '600' }}>HD</div>
              </div>
            </div>

            {/* Logo */}
            <div>
              <h1 className="logo-text text-5xl mb-3">
                MicroMentor 🚀
              </h1>
              <p style={{ color: 'rgba(150,200,255,0.75)', fontSize: '16px', lineHeight: '1.7', fontFamily: 'Rajdhani', fontWeight: '400', letterSpacing: '0.3px' }}>
                Book 15-minute mentorship sessions and accelerate your career with top industry professionals.
              </p>

              {/* Stats Row */}
              <div className="flex gap-6 mt-5">
                {[['2.4K+', 'Mentors'], ['50K+', 'Sessions'], ['4.9★', 'Rating']].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'Orbitron', fontWeight: '700', fontSize: '18px', color: '#00f5ff', textShadow: '0 0 10px rgba(0,245,255,0.5)' }}>{val}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(150,200,255,0.6)', letterSpacing: '1px', fontFamily: 'Rajdhani' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-6 relative z-10 h-full overflow-hidden">
          <div className="relative w-full" style={{ maxWidth: '420px' }}>

            {/* Back panel (3D depth effect) */}
            <div className="glass-panel-back" />

            {/* Main login card */}
            <div className="main-login-card glow-border p-8">

              {/* Title */}
              <h2 className="welcome-text text-3xl mb-7 text-center tracking-wider" style={{ color: 'white', textShadow: '0 0 30px rgba(0,200,255,0.4)' }}>
                Welcome Back 👋
              </h2>

              {/* Error */}
              {error && (
                <div className="mb-4 py-2 px-4 text-center text-sm rounded-xl" style={{ background: 'rgba(255,50,50,0.15)', border: '1px solid rgba(255,100,100,0.3)', color: '#ff9999', fontFamily: 'Rajdhani' }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Email Input */}
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: 'rgba(0,200,255,0.7)' }}>✉️</span>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field w-full pl-11 pr-5 py-3.5 text-base"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Password Input */}
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: 'rgba(0,200,255,0.7)' }}>🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field w-full pl-11 pr-5 py-3.5 text-base"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="login-btn w-full py-4 text-base"
                style={{ fontSize: '15px' }}
              >
                LOGIN 🔐
              </button>

              {/* Links */}
              <div className="mt-4 text-center space-y-1.5">
                <p>
                  <span className="link-text" onClick={() => navigate("/forgot-password")}>
                    Forgot Password?
                  </span>
                </p>
                <p className="link-text">
                  Don't have an account?{' '}
                  <span className="link-accent" onClick={() => navigate("/register")}>
                    Register
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,200,255,0.3))' }} />
                <span style={{ color: 'rgba(100,180,255,0.5)', fontSize: '12px', fontFamily: 'Rajdhani', letterSpacing: '2px' }}>OR</span>
                <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(to left, transparent, rgba(0,200,255,0.3))' }} />
              </div>

              {/* Social Buttons */}
              <div className="space-y-3">
                <button className="social-btn w-full py-3 px-4 flex items-center justify-center gap-3 text-sm font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="social-btn w-full py-3 px-4 flex items-center justify-center gap-3 text-sm font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>

                <button className="social-btn w-full py-3 px-4 flex items-center justify-center gap-3 text-sm font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
