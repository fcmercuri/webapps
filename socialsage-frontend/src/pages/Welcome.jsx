// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = () => {
    localStorage.removeItem("firstLogin");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-indigo-900 to-black text-white px-4">
      <div className="max-w-lg w-full bg-black/60 border border-yellow-400/30 rounded-3xl p-10 shadow-xl backdrop-blur-md">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-400 text-center">
          Welcome to sAInthetic
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-center text-lg md:text-xl mb-6">
          Your account has been created and you are now signed in
          {user?.email ? ` as ${user.email}` : ""}.
        </p>

        {/* Features / Steps */}
        <div className="mb-8">
          <ul className="space-y-3 list-disc list-inside text-gray-300 text-base md:text-lg">
            <li>Create your first AI persona.</li>
            <li>Describe your business model and goals.</li>
            <li>Get tailored monetisation ideas and action steps.</li>
          </ul>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
        >
          Go to your dashboard
        </button>
      </div>
    </div>
  );
};

export default Welcome;