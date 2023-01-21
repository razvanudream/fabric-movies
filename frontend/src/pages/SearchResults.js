import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import SummaryList from "./SummaryList";

function SearchResults() {
  const { search } = useLocation();
  const { q } = queryString.parse(search);

  return <SummaryList searchTerm={q} />;
}

export default SearchResults;
