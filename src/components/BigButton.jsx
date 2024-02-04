import React from "react";
import "../styles/BigButton.css";

const BigButton = () => {
  return (
    <button>
      <div className="icon-wrapper">
        <i class="fa-regular fa-user"></i>
      </div>
      <p>Type your item ...</p>
    </button>
  );
};

export default BigButton;
