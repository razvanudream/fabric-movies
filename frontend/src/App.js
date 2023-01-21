import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MovieSelector from "./components/MovieSelector";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <Router>
        <MovieSelector />
        <Pages />
      </Router>
    </div>
  );
}

export default App;
