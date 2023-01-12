import React from "react";

import styled from "styled-components";
import CardItem from "./CardItem.jsx";

import breakpoint from "../../styles/breakpoint.js";

const ItemGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
    margin: 0 20px;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;
    margin: 0 20px;
  }
`;

export default function ItemList({ data }) {
  return (
    <ItemGrid>
      {data.map((item, index) => {
        return <CardItem data={item} key={index} />;
      })}
    </ItemGrid>
  );
}