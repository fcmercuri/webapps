import React from "react";
import { Link } from "react-router-dom";

const firstArticle = {
  title: "Why Creating Buyer Personas Transforms Marketing Strategies for Expert Marketers",
  excerpt: "In the complex world of modern marketing, where consumer behaviors shift rapidly and competition intensifies daily, creating detailed buyer personas stands out as a foundational strategy that separates thriving campaigns from mediocre ones.",
  path: "/blog/why-buyer-personas-transform-marketing"  // Fixed to match App.jsx route
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden relative">
      {/* Animated background particles for AI/synthetic feel */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-xl border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
            sAInthetic Blog
          </h1>
          <p className="mt-4 text-xl lg:text-2xl text-slate-600/80 font-medium max-w-2xl leading-relaxed">
            Insights on AI-generated personas, marketing strategies, and tools that resonate with your audience. Powered by synthetic intelligence.
          </p>
        </div>
      </header>

      {/* Hero Featured Article */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <span className="inline-flex bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 text-sm font-bold px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-sm shadow-lg">
              🔥 Featured
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-100 leading-tight drop-shadow-2xl">
              {firstArticle.title}
            </h2>
            <p className="text-xl lg:text-2xl text-slate-300/90 leading-relaxed max-w-lg">
              {firstArticle.excerpt}
            </p>
            <Link
              to={firstArticle.path}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:shadow-purple-500/25 transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 border border-purple-500/20 backdrop-blur-sm text-lg"
            >
              Read the Article
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl p-12 lg:p-16 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-4">
              <div className="text-center relative z-10">
                <div className="w-28 h-28 lg:w-32 lg:h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl ring-2 ring-white/20 animate-spin-slow">
                  <svg className="w-16 h-16 lg:w-20 lg:h-20 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-100 mb-4 drop-shadow-lg">AI-Powered Personas</h3>
                <p className="text-xl text-slate-300 mb-8 font-medium">Generated instantly for targeted marketing</p>
                <a 
                  href="https://sainthetic.com/" 
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 font-bold text-lg group hover:underline decoration-2 underline-offset-4 transition-all duration-200"
                >
                  Try sAInthetic →
                  <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-100 mb-6 drop-shadow-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Recent Articles
          </h2>
          <p className="text-2xl text-slate-300/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Dive deeper into strategies that transform how you connect with customers using synthetic AI personas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured article card */}
          <article className="group bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-6 border border-white/20 hover:border-purple-500/30">
            <div className="p-10 lg:p-12">
              <span className="inline-flex bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-2xl mb-6 shadow-lg">
                🚀 Latest
              </span>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-100 mb-6 group-hover:text-purple-400 transition-all duration-300 line-clamp-2 leading-tight drop-shadow-lg">
                {firstArticle.title}
              </h3>
              <p className="text-lg text-slate-300/90 mb-8 line-clamp-3 leading-relaxed group-hover:text-slate-200 transition-colors">
                {firstArticle.excerpt}
              </p>
              <Link
                to={firstArticle.path}
                className="text-purple-400 hover:text-purple-300 font-bold text-lg flex items-center group-hover:underline decoration-2 underline-offset-4 transition-all duration-200"
              >
                Read more →
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
          {/* Enhanced Placeholder cards with better skeletons */}
          <article className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 animate-pulse">
            <div className="h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-t-3xl"></div>
            <div className="p-10 lg:p-12">
              <span className="inline-block bg-white/20 h-6 w-24 rounded-2xl mb-6"></span>
              <div className="h-10 lg:h-12 bg-white/20 rounded-xl mb-6"></div>
              <p className="h-24 bg-white/20 rounded-xl mb-8"></p>
              <div className="h-7 bg-white/20 w-28 rounded-lg"></div>
            </div>
          </article>
          <article className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 animate-pulse delay-150">
            <div className="h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-t-3xl"></div>
            <div className="p-10 lg:p-12">
              <span className="inline-block bg-white/20 h-6 w-24 rounded-2xl mb-6"></span>
              <div className="h-10 lg:h-12 bg-white/20 rounded-xl mb-6"></div>
              <p className="h-24 bg-white/20 rounded-xl mb-8"></p>
              <div className="h-7 bg-white/20 w-28 rounded-lg"></div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 drop-shadow-2xl">
            Ready to create personas that convert?
          </h2>
          <p className="text-2xl mb-12 opacity-95 font-medium max-w-2xl mx-auto leading-relaxed">
            Generate AI-powered buyer personas instantly with sAInthetic.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://sainthetic.com/"
              className="group px-10 py-6 bg-white/90 text-purple-600 font-black rounded-3xl shadow-3xl hover:shadow-4xl hover:shadow-white/30 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl backdrop-blur-md border border-white/30"
            >
              Get Started Free
              <svg className="w-6 h-6 ml-2 inline group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <Link
              to={firstArticle.path}
              className="px-10 py-6 border-2 border-white/50 text-white font-black rounded-3xl hover:bg-white/20 hover:border-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl backdrop-blur-sm"
            >
              Read First Article
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
