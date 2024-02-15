import React from "react";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">
          <p>ShopList</p>
        </NavLink>
        <ul>
          <NavLink to="/login">
            <li>Sign In</li>
          </NavLink>
          <NavLink to="/login">
            <li className="signup-button">Sign Up</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
