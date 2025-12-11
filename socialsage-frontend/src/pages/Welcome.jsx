// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { motion } from "framer-motion";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = () => {
    localStorage.removeItem("firstLogin");
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-indigo-900 to-black overflow-hidden px-4">
      {/* Background floating circle */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-yellow-400/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-5 w-60 h-60 bg-pink-500/20 rounded-full filter blur-2xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-black/60 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-10 shadow-xl"
      >
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-400 text-center mb-4">
          Welcome to sAInthetic
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-center text-lg md:text-xl mb-6">
          Your account has been created and you are now signed in
          {user?.email ? ` as ${user.email}` : ""}.
        </p>

        {/* Features / Steps */}
        <ul className="mb-8 space-y-3 list-disc list-inside text-gray-300 text-base md:text-lg">
          <li>Create your first AI persona.</li>
          <li>Describe your business model and goals.</li>
          <li>Get tailored monetisation ideas and action steps.</li>
        </ul>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
        >
          Go to your dashboard
        </button>
      </motion.div>
    </div>
  );
};

export default Welcome;