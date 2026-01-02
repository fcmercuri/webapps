// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";

const firstArticle = {
  title: "Why Creating Buyer Personas Transforms Marketing Strategies for Expert Marketers",
  excerpt: "In the complex world of modern marketing, where consumer behaviors shift rapidly and competition intensifies daily, creating detailed buyer personas stands out as a foundational strategy that separates thriving campaigns from mediocre ones.",
  path: "/blog/why-buyer-personas-transform-marketing"  // Fixed to match App.jsx route
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900">sAInthetic Blog</h1>
          <p className="mt-3 text-xl text-gray-600">
            Insights on AI-generated personas, marketing strategies, and tools that resonate with your audience.
          </p>
        </div>
      </header>

      {/* Hero Featured Article */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Featured
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {firstArticle.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {firstArticle.excerpt}
            </p>
            <Link
              to={firstArticle.path}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Read the Article
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/30 shadow-2xl">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Personas</h3>
              <p className="text-gray-600">Generated instantly for targeted marketing</p>
              <a href="https://sainthetic.com/" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
                Try sAInthetic →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Recent Articles</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive deeper into strategies that transform how you connect with customers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured article card again for preview */}
          <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="p-8">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                Latest
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                {firstArticle.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                {firstArticle.excerpt}
              </p>
              <Link
                to={firstArticle.path}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center group-hover:underline"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
          {/* Placeholder cards */}
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
            <div className="p-8">
              <span className="inline-block bg-gray-200 h-5 w-20 rounded-full mb-4 animate-pulse"></span>
              <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <p className="h-20 bg-gray-200 rounded animate-pulse mb-6"></p>
              <div className="h-6 bg-gray-200 w-24 rounded animate-pulse"></div>
            </div>
          </article>
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
            <div className="p-8">
              <span className="inline-block bg-gray-200 h-5 w-20 rounded-full mb-4 animate-pulse"></span>
              <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <p className="h-20 bg-gray-200 rounded animate-pulse mb-6"></p>
              <div className="h-6 bg-gray-200 w-24 rounded animate-pulse"></div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to create personas that convert?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Generate AI-powered buyer personas instantly with sAInthetic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
                            href="https://sainthetic.com/"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 text-lg"
            >
              Get Started Free
            </a>
            <Link
              to={firstArticle.path}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 text-lg"
            >
              Read First Article
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

