import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-purple-300">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              About This Project
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                This project is a <span className="font-semibold text-purple-700">production-ready MERN authentication system</span> that
                implements secure, modern login flows using JWTs, HTTP-only cookies, and
                well-structured API and frontend patterns for real-world apps. It
                provides user registration and login with bcrypt-hashed passwords,
                guarded server endpoints and client routes, and a clean DX with modular
                Node/Express code and a React frontend wired for stateful auth.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                Technical Stack
              </h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                On the server, <span className="font-semibold">Express and Mongoose</span> offer a robust foundation for
                modeling users and enforcing auth with JSON Web Tokens stored in
                HTTP-only cookies to mitigate XSS risks. Endpoints are protected via middleware that verifies
                tokens and surfaces clear error messages, keeping the codebase
                maintainable and secure.
              </p>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                On the client, <span className="font-semibold">React (with Context API)</span> powers protected routes, 
                session-aware navigation, and API communication through Axios, styled with 
                <span className="font-semibold"> Tailwind CSS</span> for fast UI iteration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-2">🔐 Security</h3>
                  <p className="text-sm text-gray-600">Bcrypt-hashed passwords, JWT tokens, HTTP-only cookies</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-2">📧 Email Verification</h3>
                  <p className="text-sm text-gray-600">OTP-based email verification system</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-2">🔑 Password Reset</h3>
                  <p className="text-sm text-gray-600">Secure password reset with OTP verification</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-2">⚡ Modern Stack</h3>
                  <p className="text-sm text-gray-600">React 19, Vite, Tailwind CSS, Express, MongoDB</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Why This Project?
              </h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                The result is a full-stack template that balances <span className="font-semibold text-purple-700">developer ergonomics
                and security best practices</span>: hashed credentials, token-based access
                control, middleware-driven protection, safe token storage, and a
                consistent error/response model. It's suitable as a starter for any app
                that needs reliable authentication, and it's easy to extend—add roles,
                refresh tokens, profile routes, or multi-factor flows as needed.
              </p>
            </section>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
