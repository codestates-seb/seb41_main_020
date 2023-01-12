import React from "react";

import ListItem from "./ListItem.jsx";

import breakpoint from "../../../styles/breakpoint.js";

import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
  height: 88%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 50%;
    height: 50%;
  }
`;

export default function List() {
  return (
    <ListContainer>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </ListContainer>
  );
}
