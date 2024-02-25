import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import shoplistIcon from "../assets/woman-shopping.svg";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const location = window.location.href;

  // const [showShoplist, setShowShoplist] = useState(true);
  // console.log(location, showShoplist);
  // useEffect(() => {
  //   if (location.substring(location.length - 10) === "myshoplist") {
  //     setShowShoplist(false);
  //   }
  // }, [location]);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.reload();
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, [auth]);

  return (
    <header>
      <nav>
        <NavLink to="/" className="nav-link">
          <div className="shoplist-title-icon-wrapper">
            <div className="shoplist-icon-wrapper">
              <img src={shoplistIcon} />
            </div>
            <p className="app-title">ShopList</p>
          </div>
        </NavLink>
        {isLoggedIn ? (
          <ul>
            <NavLink
              to="/myshoplist"
              // onClick={() => setIsMyShoplist(true)}
              className="nav-link myshoplist-button">
              <li>My shoplist</li>
            </NavLink>
            <li className="logout-button nav-link" onClick={handleSignOut}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </li>
          </ul>
        ) : (
          <ul>
            {/* <NavLink to="/login" className="nav-link">
              <li>Sign In</li>
            </NavLink> */}
            <NavLink to="/login" className="nav-link">
              <li className="signup-button">Sign Up</li>
            </NavLink>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
