import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { appContext } from "../context/appContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const { backendUrl } = useContext(appContext);
  axios.defaults.withCredentials = true; // Sends the cookie with req

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onsubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otpString = otpArray.join("");
    setOtp(otpString);
    
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-reset-otp",
        { email, otp: otpString }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword});
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
     } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
  return (
    <div className="bg-gradient-to-br from-blue-200 to-pink-400 min-w-screen min-h-screen flex  justify-center items-center">
      <img
        onClick={() => navigate("/")}
        src={assets.myLogo}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-28 sm:w-32 cursor-pointer"
      />
      {/* email sent */}
      {!isEmailSent && (
        <div
          className="bg-gradient-to-br from-pink-200  to-purple-400 border 
      p-10 rounded-xl shadow-xl w-full sm:w-96 border-slate-400 text-slate-200 text-sm"
        >
          <h1 className="text-4xl text-center text-indigo-500 font-bold mb-3">
            Reset Password
          </h1>
          <p className="text-base text-center text-slate-800 mb-6">
            Enter your Registered Email
          </p>
          <form
            onSubmit={onsubmitEmail}
            className="flex flex-col justify-center text-sm"
          >
            <div className="w-full mb-5 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#3a4a53]">
              <img className="w-4 h-4 mr-4 text-black" src={assets.mail_icon} />
              <input
                className="bg-transparent  w-full outline-none text-base"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-800 text-white font-medium">
              Reset Password
            </button>
          </form>
        </div>
      )}
      {/* reset password otp */}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className=" bg-gradient-to-br from-pink-200  to-purple-400 border border-slate-400 rounded-lg p-9 w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password Otp
          </h1>
          <p className="text-center mb-6 text-indigo-700">
            Enter the 6-digit code sent to your email id.
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md outline-blue-600"
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="py-2.5 text-white font-semibold text-base bg-gradient-to-r from-indigo-500 to-purple-600 w-full rounded-full ">
            Submit
          </button>
        </form>
      )}
      {/* enter new Password */}

      {isOtpSubmitted && isEmailSent && (
        <div
          className="bg-gradient-to-br from-pink-200  to-purple-400 border 
      p-10 rounded-xl shadow-xl w-full sm:w-96 border-slate-400 text-slate-200 text-sm"
        >
          <h1 className="text-4xl text-center text-indigo-500 font-bold mb-3">
            New Password
          </h1>
          <p className="text-base text-center text-slate-800 mb-6">
            Enter your New Password
          </p>
          <form onSubmit={onSubmitNewPassword} className="flex flex-col justify-center text-sm">
            <div className="w-full mb-5 flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#3a4a53]">
              <img className="w-4 h-4 mr-4 text-black" src={assets.lock_icon} />
              <input
                className="bg-transparent  w-full outline-none text-base"
                type="password"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button className="w-full rounded-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-800 text-white font-medium">
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
