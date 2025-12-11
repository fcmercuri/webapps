import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
      <div className="max-w-md w-full bg-black/40 border border-yellow-400/40 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome to sAInthetic
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Your account has been created and you are now signed in
          {user?.email ? ` as ${user.email}` : ""}.
        </p>

        <ul className="text-sm text-gray-300 mb-6 list-disc list-inside space-y-1">
          <li>Create your first AI persona.</li>
          <li>Describe your business model and goals.</li>
          <li>Get tailored monetisation ideas and action steps.</li>
        </ul>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition-colors"
        >
          Go to your dashboard
        </button>

        <p className="mt-4 text-xs text-gray-500 text-center">
          You can always update your profile and preferences later from the
          dashboard.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
