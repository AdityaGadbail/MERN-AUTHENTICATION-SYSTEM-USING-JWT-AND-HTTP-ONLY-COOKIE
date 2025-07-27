import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { appContext } from "../context/appContext";
const Header = () => {

  const {userData} = useContext(appContext);
  return (
    <div>
      <hr className=" border-gray-800  shadow-red-600" />
      <section className="text-center flex flex-col items-center w-full py-20 bg-gradient-to-r from-pink-100 to-purple-300">
        
        <img
          src={assets.header_img}
          alt=""
          className="h-48 w-48 rounded-full mb-6 relative "
        />
        <h1 className="text-4xl font-bold text-gray-900">
          Secure Auth for Your MERN App
        </h1>
        <h1 className="flex items-center  text-3xl font-bold mt-4 text-gray-700">Welcome {}{userData ? userData.name : 'Developer'}!<img className="w-7 ml-3 aspect-square" src={assets.hand_wave} alt="" /></h1>

        <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
          AuthForge lets developers implement secure login, registration, JWT,
          and role-based access in minutes.
        </p>
        <button className="mt-6  bg-purple-400  text-white px-6 py-3 rounded-full hover:bg-gradient-to-t from-purple-400 to-purple-600 hover:py-3 hover:px-7 transition-all">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Header;
