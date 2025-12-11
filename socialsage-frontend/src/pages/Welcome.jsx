// src/pages/LoginTemplate.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginTemplate() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/70 backdrop-blur-md border border-yellow-400/20 rounded-2xl p-12 w-full max-w-md shadow-xl"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="mx-auto w-12 h-12 rounded-lg mb-4 shadow-md"
          />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-400">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <div>
            <label className="block text-yellow-400 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-yellow-400 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-yellow-400 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Social Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}