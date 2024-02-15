import React from "react";
import "../styles/ItemWrapper.css";
import { doc, updateDoc } from "firebase/firestore";
import { auth, shoplistsCollection } from "../firebase";
const ItemWrapper = ({ item, shoplistDocId, admin }) => {
  const user = auth.currentUser;
  let isAdmin = false;
  if (user) {
    isAdmin = user.uid === admin;
  }
  const handleItemChange = async (id) => {
    const updatedItem = {
      ...item,
      isFulfilled: !item.isFulfilled,
    };
    try {
      const docRef = doc(shoplistsCollection(shoplistDocId), id);
      await updateDoc(docRef, updatedItem);
    } catch (err) {
      console.error(err);
    }
    console.log("item has been bought");
  };
  return (
    <li className="items-wrapper">
      <div className="items-detail-wrapper">
        {isAdmin && (
          <form action="">
            <input
              type="checkbox"
              id={item.id}
              value={item.isFulfilled}
              onChange={() => handleItemChange(item.id)}
              defaultChecked={item.isFulfilled}
            />
          </form>
        )}
        <div>
          <p>{item.itemName}</p>
          <small>{item.itemRequester}</small>
        </div>
      </div>
      <div className="items-amount-wrapper">
        <p>{item.itemAmount}</p>
      </div>
    </li>
  );
};

export default ItemWrapper;
