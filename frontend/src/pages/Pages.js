import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SummaryList from "./SummaryList";
import { MORPHEUS_TYPE, NEO_TYPE, SPOONBOY_TYPE } from "../utils/constants";
import SearchResults from "./SearchResults";

function Pages() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/neo" element={<SummaryList type={NEO_TYPE} />} />
      <Route path="/morpheus" element={<SummaryList type={MORPHEUS_TYPE} />} />
      <Route path="/spoonboy" element={<SummaryList type={SPOONBOY_TYPE} />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default Pages;
