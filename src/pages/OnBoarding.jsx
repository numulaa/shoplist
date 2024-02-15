import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/OnBoarding.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import CreateShoplistModal from "../components/CreateShoplistModal";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const OnBoarding = () => {
  const [joiningCode, setJoiningCode] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isCreateShoplist, setIsCreateShoplist] = useState(false);
  const [shoplistCollection, setShoplistCollection] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "shoplist"), function (snapshot) {
      const shoplistCollectionArr = snapshot.docs.map((doc) => doc.id);
      setShoplistCollection(shoplistCollectionArr);
    });
    return unsub;
  }, []);
  const handleSubmitCode = (e) => {
    e.preventDefault();
    if (shoplistCollection.indexOf(joiningCode) !== -1) {
      navigate(`/main/${joiningCode}`);
    } else {
      alert("Please enter the right code");
      setJoiningCode("");
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignup(true);
      }
    });
  }, []);
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
        {isSignup ? (
          <div className="buttons">
            <button
              className="signup-button"
              onClick={() => setIsCreateShoplist(true)}>
              Create a new shoplist
            </button>
          </div>
        ) : (
          <div className="buttons">
            <button
              className="signup-button"
              onClick={() => navigate("/login")}>
              Sign up to get started
            </button>
            <button
              className="signin-button"
              onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>
        )}
        {isCreateShoplist && (
          <CreateShoplistModal
            handleCloseModal={() => setIsCreateShoplist(false)}
          />
        )}
      </main>
    </div>
  );
};

export default OnBoarding;
