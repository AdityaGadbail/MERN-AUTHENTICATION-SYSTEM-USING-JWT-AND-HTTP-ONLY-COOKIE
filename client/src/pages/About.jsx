import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-pink-100 flex-col to-purple-300 h-screen flex justify-center  items-center">
       <img
        onClick={() => navigate("/")}
        src={assets.myLogo}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-28 sm:w-32 cursor-pointer"
      />
      <div className="w-1/2">
      <div className="text-xl text-center mb-5">About This Project</div>
      <p>
        This project is a production-ready MERN authentication system that
        implements secure, modern login flows using JWTs, HTTP-only cookies, and
        well-structured API and frontend patterns for real-world apps. It
        provides user registration and login with bcrypt-hashed passwords,
        guarded server endpoints and client routes, and a clean DX with modular
        Node/Express code and a React frontend wired for stateful auth. The
        backend issues and validates tokens with proper middleware, error
        handling, secure headers, and CORS, while the frontend manages session
        state, auto-login on refresh, and graceful logout for a smooth UX.
      </p>
       <br />
      <p>
        On the server, Express and Mongoose offer a robust foundation for
        modeling users and enforcing auth with JSON Web Tokens stored in
        HTTP-only cookies to mitigate XSS risks, with support for localStorage
        if preferred. Endpoints are protected via middleware that verifies
        tokens and surfaces clear error messages, keeping the codebase
        maintainable and secure. On the client, React (with Context API or
        Redux) powers protected routes, session-aware navigation, and API
        communication through Axios, styled with Tailwind CSS for fast UI
        iteration.
      </p>
      <br />
      <p>
        The result is a full-stack template that balances developer ergonomics
        and security best practices: hashed credentials, token-based access
        control, middleware-driven protection, safe token storage, and a
        consistent error/response model. It’s suitable as a starter for any app
        that needs reliable authentication, and it’s easy to extend—add roles,
        refresh tokens, profile routes, or multi-factor flows as needed.
      </p>
    </div>
    </div>
  );
};

export default About;
