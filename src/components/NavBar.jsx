import React from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
// import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { setLoggedOut, isLoggedIn } = useAuth();

  const logout = async () => {
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
    navigate("/login");
  };

  return (
    <Navbar fluid className="border-b border-b-neutral-200">
      <NavbarBrand href="/" className="flex gap-3">
        <img className="-rotate-12" src={logo} width={50} alt="Kontrol Pipa" />
        <span className="self-center whitespace-nowrap text-lg font-semibold text-blue-800">
          Valve
        </span>
      </NavbarBrand>
      {/* <div className="flex order-2 sm:px-3"> */}
      {/* {location.pathname !== "/login" && (
        <Button
          onClick={logout}
          size="sm"
          className="text-xs border-blue-300 text-blue-700"
          color={"alternative"}>
          Logout
        </Button>
      )} */}
      {/* </div> */}
      {location.pathname !== "/login" && <NavbarToggle />}
      {location.pathname !== "/login" && (
        <NavbarCollapse className="gap-2">
          <NavbarLink
            active={location.pathname === "/"}
            className="h-full flex justify-center items-center"
            href="/">
            Home
          </NavbarLink>
          <NavbarLink>
            <Button
              onClick={logout}
              size="sm"
              className="w-full text-xs border-blue-300 text-blue-700"
              color={"alternative"}>
              Logout
            </Button>
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
};

export default NavBar;
