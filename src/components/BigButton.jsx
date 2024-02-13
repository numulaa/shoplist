import React from "react";
import "../styles/BigButton.css";

const BigButton = ({ onClick }) => {
  return (
    <button className="big-button" onClick={onClick}>
      <div className="icon-wrapper">
        <i className="fa-regular fa-user"></i>
      </div>
      <p>Type your item ...</p>
    </button>
  );
};

export default BigButton;
