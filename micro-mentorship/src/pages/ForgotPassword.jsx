import React, { useState } from "react";
import API from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!email) {
      setMessage("Email required");
      return;
    }

    try {
      await API.post("/auth/forgot-password", { email });
      setMessage("Reset link sent to your email");
    } catch {
      setMessage("User not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="g-blue-600 text-white w-full p-2 rounded"
        >
          Send Reset Link
        </button>

        {message && (
            <p className="mt-3 text-sm text-center">
                {message}
            </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
