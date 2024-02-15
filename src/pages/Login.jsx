import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/google-logo.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const photoURL = user.photoURL;

        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [auth]);

  const onLoginHandle = (e) => {
    e.preventDefault();
    if (isSignup) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // navigate("/");
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // navigate("/");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const onGoogleSignInHandle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        navigate("/login");
      });
  };
  return (
    <div className="login-page-container">
      <h1>{isSignup ? "Login" : "Create Account"}</h1>
      <button className="btn btn-google" onClick={onGoogleSignInHandle}>
        <img src={googleLogo} />
        Sign In with Google
      </button>
      <form onSubmit={onLoginHandle} className="login-form">
        <Input
          id="email-login"
          label="Email"
          type="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password-login"
          label="Password"
          type="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isSignup && (
          <Input
            id="confirm-password-login"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button className="btn btn-signin">
          {isSignup ? "Sign In" : "Create Account"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="btn-have-account">
          {isSignup ? "Create Account" : "Sign In"}
        </button>
      </p>
      {/* <button className="btn btn-create-account">Create Account</button> */}
    </div>
  );
};

export default Login;
