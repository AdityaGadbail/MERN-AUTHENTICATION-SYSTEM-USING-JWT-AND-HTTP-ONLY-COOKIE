import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const { userData, backendUrl, setIsLoggedin, setUserdata } =
    useContext(appContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserdata(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {" "}
      <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24   max-h-20 bg-gradient-to-r from-pink-300 to-purple-400">
        <img src={assets.myLogo} alt="" className="w-28 sm:w-32" />
        <div>
          <ul className="flex gap-2  sm:gap-8 pointer">
            <li onClick={()=> navigate('/about')} className=" hover:text-gray-700 cursor-pointer">About</li>
            <li onClick={()=> navigate('/contact')} className=" hover:text-gray-700 cursor-pointer">Contact Me</li>
          </ul>
        </div>
        {userData ? (
          <div className="w-10 h-10 flex justify-center items-center text-white text-xl bg-purple-900  cursor-pointer font-bold  rounded-full relative group">
            {userData.name[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-lg pt-10 w-28 mt-1">
              <ul className="list-none p-2 m-0 bg-gradient-to-tr from-purple-400  to-red-600 text-white  font-normal text-sm">
                {userData && !userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1  px-2 hover:bg-pink-200 hover:text-black cursor-pointer  text-center rounded-lg"
                  >
                    Verify Email
                  </li>
                )}

                <li
                  onClick={logout}
                  className="py-1 px-3 hover:bg-pink-200 hover:text-black  cursor-pointer  rounded-lg text-center"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 border bg-gradient-to-r from-pink-200 to-pink-400 border-gray-600 rounded-full px-6 py-2  hover:py-3 hover:px-6 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="" />
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
