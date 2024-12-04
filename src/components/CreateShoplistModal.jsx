import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import "../styles/FormModal.css";
import { db, auth } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateShoplistModal = ({ handleCloseModal }) => {
  const [shoplistName, setShoplistName] = useState("");
  const [shoplistDesc, setShoplistDesc] = useState("");
  const [endAt, setEndAt] = useState(new Date());
  const user = auth.currentUser;
  const navigate = useNavigate();
  const handleCreateNewShoplist = async (e) => {
    e.preventDefault();
    // const user = auth.currentUser;

    const newShoplist = {
      admin: user.uid,
      createdAt: serverTimestamp(),
      endAt: endAt,
      shoplistName: shoplistName,
      shoplistDesc: shoplistDesc,
    };
    const date = Date.now();
    const shoplistCode = date.toString().substring(7);

    try {
      const docRef = doc(db, "shoplist", shoplistCode);
      await setDoc(docRef, newShoplist);
      console.log("a new item added, with ID:", docRef.id);
      setShoplistName("");
      handleCloseModal();
      console.log(shoplistName, newShoplist[shoplistName]);
      navigate(`/main/${shoplistCode}`);
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
        <h1>Create a new shoplist</h1>
        <form onSubmit={handleCreateNewShoplist}>
          <Input
            id="new-shoplist"
            type="text"
            value={shoplistName}
            required={true}
            onChange={(e) => setShoplistName(e.target.value)}
            placeholder="Type your shoplist name here..."
          />
          <Input
            id="new-shoplist"
            type="text"
            value={shoplistDesc}
            required={true}
            onChange={(e) => setShoplistDesc(e.target.value)}
            placeholder="Type your shoplist desc here..."
          />

          <Input
            id="new-item-requester"
            type="date"
            value={endAt}
            required={true}
            onChange={(e) => setEndAt(e.target.value)}
            placeholder="-"
          />

          <button className="btn form-add-item-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

CreateShoplistModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

export default CreateShoplistModal;
