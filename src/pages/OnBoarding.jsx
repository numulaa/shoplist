import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/OnBoarding.css";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [joiningCode, setJoiningCode] = useState("");
  const navigate = useNavigate();
  const handleSubmitCode = (e) => {
    e.preventDefault();
    console.log(`your code is ${joiningCode}`);
    navigate("/main");
  };
  return (
    <div className="on-boarding">
      <form onSubmit={handleSubmitCode} className="code-input-form">
        <p>Join as a partcipant?</p>
        <div className="code-input-wrapper">
          <input
            type="text"
            value={joiningCode}
            onChange={(e) => setJoiningCode(e.target.value)}
            placeholder="Enter your code here"
          />

          <button type="submit">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </form>
      <main className="onboarding-main-section">
        <h1>
          Streamline Shopping Requests: Effortlessly Coordinate Your Market
          Lists in Real-time
        </h1>
        <p>
          Share Codes or Links for Instant Collaboration, Perfect for Moms,
          Friends, and Beyond!
        </p>
        <div className="buttons">
          <button className="signup-button">Sign up to get started</button>
          <button className="signin-button">Sign in</button>
        </div>
      </main>
    </div>
  );
};

export default OnBoarding;
