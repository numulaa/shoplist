import React from "react";
import "../styles/ItemWrapper.css";
import { doc, updateDoc } from "firebase/firestore";
import { shoplistsCollection } from "../firebase";
const ItemWrapper = ({ item }) => {
  const handleItemChange = async (id) => {
    const updatedItem = {
      ...item,
      isFulfilled: !item.isFulfilled,
    };
    try {
      const docRef = doc(shoplistsCollection, id);
      await updateDoc(docRef, updatedItem);
    } catch (err) {
      console.error(err);
    }
    console.log("item has been bought");
  };
  return (
    <li className="items-wrapper">
      <form action="">
        <input
          type="checkbox"
          id={item.id}
          value={item.isFulfilled}
          onChange={() => handleItemChange(item.id)}
        />
      </form>
      <div className="items-detail-wrapper">
        <p>{item.itemName}</p>
        <small>{item.itemRequester}</small>
      </div>
      <div className="items-amount-wrapper">
        <p>{item.itemAmount}</p>
      </div>
    </li>
  );
};

export default ItemWrapper;
