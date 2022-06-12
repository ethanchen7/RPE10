import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import rpelogo from "../../assets/images/rpelogo.png";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar-container">
      <div className="logo-container">
        <img src={rpelogo} />
        <h3>RPE10</h3>
      </div>
      <div className="navbar-left">
        <p>Features</p>
        <p>About</p>
      </div>
      <div className="navbar-right">
        <button className="nav-login-btn">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </button>
        <button className="nav-getstarted-btn">
          <NavLink to="/login" exact={true} activeClassName="active">
            Get Started
          </NavLink>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
