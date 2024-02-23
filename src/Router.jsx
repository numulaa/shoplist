import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnBoarding from "./pages/OnBoarding";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import MyShoplist from "./pages/MyShoplist";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OnBoarding />} />
          <Route path="main/:shoplistDocId" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="myshoplist" element={<MyShoplist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
