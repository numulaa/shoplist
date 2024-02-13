import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BigButton from "../components/BigButton";
import ItemWrapper from "../components/ItemWrapper";
import "../styles/MainPage.css";
import FormModal from "../components/FormModal";
import { shoplistsCollection } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [isShowingModalAddItem, setIsShowingModalAddItem] = useState(false);
  const handleOpenModalAddItem = () => {
    setIsShowingModalAddItem(true);
  };
  useEffect(() => {
    const unsub = onSnapshot(shoplistsCollection, function (snapshot) {
      // sync up our local notes array with the snapshot data
      const shoplistsArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(shoplistsArr);
      setItems(shoplistsArr);
    });

    return unsub;
  }, []);
  return (
    <div className="main-page-container">
      {isShowingModalAddItem && (
        <FormModal handleCloseModal={() => setIsShowingModalAddItem(false)} />
      )}
      <section className="mainpage-main-section">
        <h1>This is the List Name</h1>
        <p>
          Hey guys, you can add the items you want me to buy at the minimarket
          for our movie night. Remember i only have 2 hands, love u
        </p>
      </section>
      <BigButton onClick={handleOpenModalAddItem} />
      <ul className="shop-items">
        {items.map((item) => (
          <ItemWrapper item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
