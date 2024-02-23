import React, { useEffect, useState } from "react";
import "../styles/OnBoarding.css";
import "../styles/MyShoplist.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
const MyShoplist = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [shoplistCollection, setShoplistCollection] = useState([]);

  // const user = auth.currentUser;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setIsSignup(true);
        const q = query(
          collection(db, "shoplist"),
          where("admin", "==", user.uid)
        );
        const unsub = onSnapshot(q, function (snapshot) {
          const shoplistCollectionArr = snapshot.docs?.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setShoplistCollection(shoplistCollectionArr);
        });
        return unsub;
      }
    });
  }, [auth]);
  return (
    <div className="on-boarding">
      <main className="onboarding-main-section">
        <h1>Hello, {userName}</h1>
        <p>Here's the list of all your shoplist</p>
        <ul className="list-of-shoplist ">
          {shoplistCollection.map((shoplist) => (
            <li
              key={shoplist.id}
              className="code-input-form my-shoplist-list-item">
              {shoplist.shoplistName}
              <Link to={`/main/${shoplist.id}`} className="list-link">
                <i className="fa-solid fa-circle-arrow-right"></i>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default MyShoplist;
