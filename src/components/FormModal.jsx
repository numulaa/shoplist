import React, { useState } from "react";
import Input from "./Input";
import "../styles/FormModal.css";
import { shoplistsCollection } from "../firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";

const FormModal = ({ handleCloseModal }) => {
  const [item, setItem] = useState("");
  const [itemAmount, setItemAmount] = useState(null);
  const [itemRequester, setItemRequester] = useState("");
  const handleAddMovie = async (e) => {
    e.preventDefault();
    // const user = auth.currentUser;
    // const newMovie = {
    //   title: movie,
    //   isWatched: false,
    //   createdBy: user.uid,
    //   createdAt: serverTimestamp(),
    // };
    const newItem = {
      itemName: item,
      itemAmount: itemAmount,
      itemRequester: itemRequester,
      createdAt: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(shoplistsCollection, newItem);
      console.log("a new item added, with ID:", docRef.id);
      setItem("");
      handleCloseModal();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("hello from modal");
  };
  return (
    <div className="modal-main-container">
      <div className="form-modal-container">
        <div
          onClick={handleCloseModal}
          className="form-modal-close-button-wrapper">
          X
        </div>
        <h1>Add a new item to shoplist</h1>
        <form onSubmit={handleAddMovie}>
          <Input
            id="new-item"
            type="text"
            value={item}
            required={true}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Type your item here ..."
          />

          <Input
            id="new-item-requester"
            type="number"
            value={itemAmount}
            required={true}
            onChange={(e) => setItemAmount(e.target.value)}
            placeholder="0"
          />
          <Input
            id="new-item-requester"
            type="text"
            value={itemRequester}
            required={false}
            onChange={(e) => setItemRequester(e.target.value)}
            placeholder="Your name..."
          />
          <button className="btn form-add-item-btn">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
