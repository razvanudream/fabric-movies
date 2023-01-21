import { FiMonitor } from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import { TbMoodKid } from "react-icons/tb";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import React from "react";

function MovieSelector() {
  return (
    <List>
      <div>
        <SNavLink to={"/tv"}>
          <FiMonitor />
          <h4>Neo</h4>
        </SNavLink>
      </div>
      <div>
        <SNavLink to={"/movies"}>
          <BiCameraMovie />
          <h4>Morpheus</h4>
        </SNavLink>
      </div>
      <div>
        <SNavLink to={"/kids"}>
          <TbMoodKid />
          <h4>Spoon Boy</h4>
        </SNavLink>
      </div>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const SNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: #ffffff;
    font-size: 0.8rem;
  }

  svg {
    color: #ffffff;
    font-size: 1.5rem;
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: #ffffff;
    }

    h4 {
      color: #ffffff;
    }
  }
`;

export default MovieSelector;
