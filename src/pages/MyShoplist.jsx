import React, { useEffect, useState } from "react";
import "../styles/OnBoarding.css";
import "../styles/MyShoplist.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import CreateShoplistModal from "../components/CreateShoplistModal";
import ItemWrapper from "../components/ItemWrapper";

const MyShoplist = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [shoplistCollection, setShoplistCollection] = useState([]);
  const [isCreateShoplist, setIsCreateShoplist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const user = auth.currentUser;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        return unsub;
      }
    });
  }, [auth]);

  return (
    <div className="on-boarding">
      <main className="onboarding-main-section">
        <h1>Hello, {userName}</h1>
        <p>Here's the list of all your shoplist</p>
        {isLoading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}
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
        <button
          onClick={() => setIsCreateShoplist(true)}
          className="create-new-shoplist-button">
          Create a new shoplist
        </button>
        {isCreateShoplist && (
          <CreateShoplistModal
            handleCloseModal={() => setIsCreateShoplist(false)}
          />
        )}
      </main>
    </div>
  );
};

export default MyShoplist;
