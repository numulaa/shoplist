import React from "react";
import PropTypes from "prop-types";
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

BigButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BigButton;
