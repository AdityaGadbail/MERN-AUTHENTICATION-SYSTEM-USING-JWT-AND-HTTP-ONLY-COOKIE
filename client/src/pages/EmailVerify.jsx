import React, { useContext, useEffect,useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { appContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(appContext);

  const [isSubmitting, setIsSubmitting] = useState(false); // For btn to be disabled after submitting

  const navigate = useNavigate();

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

  const sendVerificationOtp = async () => {
    setIsSubmitting(true);
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.sucess) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.sucess) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsSubmitting(false);
    }
  };

  useEffect(() => {

    isLoggedin && userData && userData.isAccountVerified && navigate("/");
    
  }, [isLoggedin, userData]);
  return (
    <div className="bg-gradient-to-br from-blue-200 to-pink-400 min-w-screen min-h-screen flex flex-col justify-center items-center">
      <img
        onClick={() => navigate("/")}
        src={assets.myLogo}
        alt=""
        className="absolute left-5 sm:left-20 top-0 w-28 sm:w-32 cursor-pointer shadow-lg"
      />

      <form
        onSubmit={onSubmitHandler}
        className=" bg-gradient-to-br from-pink-200  to-purple-400 border border-slate-400 rounded-lg p-9 w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
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
        <button 
         className={`py-3 text-white font-semibold text-base bg-gradient-to-r from-indigo-500 to-purple-600 w-full rounded-full ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed border-2 border-blue-500 outline outline-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`} 
          disabled={isSubmitting}>
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
