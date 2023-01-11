import React from "react";

import ListItem from "./ListItem.jsx";

import styled from "styled-components";

const ListContainer = styled.div`
  width: 100%;
  height: 88%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
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
