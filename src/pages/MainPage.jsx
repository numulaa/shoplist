import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigButton from "../components/BigButton";
import ItemWrapper from "../components/ItemWrapper";
import "../styles/MainPage.css";
import FormModal from "../components/AddNewItemModal";
import { mainShoplistCollection, shoplistsCollection, db } from "../firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

const MainPage = () => {
  const { shoplistDocId } = useParams();
  const [items, setItems] = useState([]);
  const [shoplistData, setShoplistData] = useState({});
  const [isShowingModalAddItem, setIsShowingModalAddItem] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const shoplistLink = window.location.href;

  const handleOpenModalAddItem = () => {
    setIsShowingModalAddItem(true);
  };
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "shoplist", shoplistDocId), (doc) => {
      const shoplistData = { ...doc.data(), id: doc.id };
      setShoplistData(shoplistData);
    });
    return unsub;
  }, [shoplistDocId]);
  useEffect(() => {
    const unsub = onSnapshot(
      shoplistsCollection(shoplistDocId),
      function (snapshot) {
        // sync up our local notes array with the snapshot data

        const shoplistsDocCollectionArr = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(shoplistsDocCollectionArr);
        setItems(shoplistsDocCollectionArr);
      }
    );

    return unsub;
  }, [shoplistDocId]);
  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(shoplistLink);
    setIsLinkCopied(true);
    console.log("clicked link");
  };
  return (
    <div className="main-page-container">
      {isShowingModalAddItem && (
        <FormModal handleCloseModal={() => setIsShowingModalAddItem(false)} />
      )}
      <section className="mainpage-main-section">
        <h1>{shoplistData.shoplistName}</h1>
        <div className="link-section">
          <h4>Your Code: {shoplistDocId}</h4>
          <button
            className="copy-link-button"
            onClick={handleCopyLink}
            disabled={isLinkCopied}>
            {isLinkCopied ? "Copied!" : "Copy link"}
          </button>
        </div>
        <p>{shoplistData.shoplistDesc}</p>
      </section>
      <BigButton onClick={handleOpenModalAddItem} />
      <ul className="shop-items">
        {items.map((item) => (
          <ItemWrapper item={item} key={item.id} admin={shoplistData.admin} />
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
