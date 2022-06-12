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
        <p>Why RPE10</p>
        <p>Features</p>
        <p>About</p>
      </div>
      <div className="navbar-right">
        <button className="nav-login-btn">Log In</button>
        <button className="nav-getstarted-btn">Get Started</button>
      </div>
      {/* <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav>
  );
};

export default NavBar;
