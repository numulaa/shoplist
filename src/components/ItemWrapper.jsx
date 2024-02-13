import React from "react";
import "../styles/ItemWrapper.css";
const ItemWrapper = ({ item }) => {
  return (
    <li className="items-wrapper">
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
