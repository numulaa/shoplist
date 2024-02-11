import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <p>ShopList</p>
        <ul>
          <li>Log In</li>
          <li className="signup-button">Sign Up</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
