import axios from "axios";
import { createContext, useState ,useEffect} from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const appContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserdata] = useState(false);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserdata(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

   useEffect(() => {
      getAuthState();
   }, [])
   

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserdata,
    getUserData,
  };
  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
};
