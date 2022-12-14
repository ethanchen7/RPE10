import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import rpelogo from "../../assets/images/rpelogo.png";
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push("/");
  };
  return (
    <nav className="nav-bar-container">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={rpelogo} />
        <h3>RPE10</h3>
      </div>
      <div className="navbar-left">
        <a href="https://www.linkedin.com/in/ethan-chen-3b7070127/">LinkedIn</a>
        <a href="https://github.com/ethanchen7/">Github</a>
        <NavLink to="/about" exact={true} activeClassName="active">
          About
        </NavLink>
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
