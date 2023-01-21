import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ListByType from "../pages/ListByType";
import { KIDS_TYPE, MOVIES_TYPE, TV_SHOWS_TYPE } from "../utils/constants";

function Pages() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/tv" element={<ListByType type={TV_SHOWS_TYPE} />} />
      <Route path="/movies" element={<ListByType type={MOVIES_TYPE} />} />
      <Route path="/kids" element={<ListByType type={KIDS_TYPE} />} />
    </Routes>
  );
}

export default Pages;
