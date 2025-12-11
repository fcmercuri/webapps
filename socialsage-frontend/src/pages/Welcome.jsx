// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = () => {
    // Mark first login as completed
    localStorage.setItem("firstLogin", "false");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-black to-[#0a0a1e] text-white p-4">
      {/* Background subtle pattern for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]" />
      
      <div className="relative max-w-md w-full bg-black/60 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Logo Section - Adapt to your app's logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
            {/* Replace with your actual logo SVG/component */}
            <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path fill="none" d="M12 2v20M2 7l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent tracking-tight">
            sAInthetic
          </h1>
          <p className="text-yellow-400/80 text-sm font-medium mt-1 tracking-wider uppercase">AI Persona Platform</p>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Welcome Aboard
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your account has been created and you're now signed in
            {user?.email ? ` as ${user.email}` : ""}.
          </p>
        </div>

        {/* Next Steps */}
        <div className="mb-10">
          <h3 className="text-yellow-400 font-semibold text-lg mb-4 text-center tracking-wide">Get Started In 3 Steps</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-400/20 border-2 border-yellow-400/50 rounded-full flex items-center justify-center text-xs font-bold text-yellow-400 mt-0.5 flex-shrink-0">1</div>
              <span>Create your first AI persona</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-400/20 border-2 border-yellow-400/50 rounded-full flex items-center justify-center text-xs font-bold text-yellow-400 mt-0.5 flex-shrink-0">2</div>
              <span>Describe your business model and goals</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-400/20 border-2 border-yellow-400/50 rounded-full flex items-center justify-center text-xs font-bold text-yellow-400 mt-0.5 flex-shrink-0">3</div>
              <span>Get tailored monetization strategies</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleContinue}
          className="group w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-black font-bold text-lg rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transform-gpu border-2 border-yellow-300/50"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Launch Dashboard</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>

        {/* Subtle footer */}
        <p className="text-xs text-gray-500 text-center mt-6 tracking-wide">
          Ready to monetize your AI personas? 🚀
        </p>
      </div>
    </div>
  );
};

export default Welcome;
