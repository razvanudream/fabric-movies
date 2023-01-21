import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MovieSelector from "./components/MovieSelector";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav>
          <RiMovie2Line />
          <Logo to={"/"}>Fabric Cinema</Logo>
        </Nav>
        <Search />
        <MovieSelector />
        <Pages />
      </Router>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

export default App;
