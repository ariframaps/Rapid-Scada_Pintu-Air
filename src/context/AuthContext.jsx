import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthReducer } from "./reducer/AuthReducer";
import { sendEmail } from "../helper/SendEmail";
import { useNavigate } from "react-router-dom";

const initialState = {
  // isLoggedIn: false,
  // loading: true,
};

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  async function setLoggedIn(username, password) {
    const res = await fetch("/api/Api/Auth/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.ok) {
      console.log("Login berhasil");
      // sendEmail();
    } else {
      throw new Error("Login gagal");
    }

    setTimeout(() => {
      setLoggedOut();
      alert("Sesi anda telah habis, silahkan login kembali");
    }, 1800000);

    navigate("/");
    return true;

    // dispatch({
    //   type: "LOGGED_IN",
    //   payload: {
    //     isLoggedIn: true,
    //     loading: state.loading,
    //   },
    // });
  }

  async function setLoggedOut() {
    const res = await fetch("/api/Api/Auth/Logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();
    if (data.ok) {
      console.log("Logout berhasil");
      window.location.reload();
    } else {
      throw new Error("logout gagal");
    }

    // dispatch({
    //   type: "LOGGED_OUT",
    //   payload: {
    //     isLoggedIn: false,
    //     // loading: state.loading,
    //   },
    // });
    navigate("/login");
  }

  const value = {
    // isLoggedIn: state.isLoggedIn,
    // loading: state.loading,
    setLoggedIn,
    setLoggedOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
