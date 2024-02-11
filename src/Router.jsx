import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnBoarding from "./pages/OnBoarding";
import MainPage from "./pages/MainPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
