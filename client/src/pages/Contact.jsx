import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-pink-100 flex-col to-purple-300 h-screen flex justify-center  items-center">
      <img
        onClick={() => navigate("/")}
        src={assets.myLogo}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-28 sm:w-32 cursor-pointer"
      />

      <main className="min-h-screen bg-transparent  text-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="mb-6 text-2xl font-semibold">Contact Me</h1>

          <div className="rounded-lg border border-slate-200 p-6">
            <p className="mb-4 text-slate-900 font-bold">
              Hello myself Aditya Gadbail
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-medium">Email:</span>{" "}
                adityagadbail003@gmail.com
              </li>
              <li>
                <span className="font-medium">Address:</span> Maharashtra ,
                Achalpur 444806
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 p-6">
            <h2 className="mb-3 text-lg font-medium">Social</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">GitHub:</span>{" "}
                <a className="text-blue-800" href="https://github.com/AdityaGadbail">
                  Github
                </a>
              </li>
              <li>
                <span className="font-medium">LinkedIn:</span>{" "}
                <a className="text-blue-800" href="www.linkedin.com/in/adityagadbail">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
