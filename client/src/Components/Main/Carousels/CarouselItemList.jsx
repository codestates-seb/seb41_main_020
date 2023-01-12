/* eslint-disable react/prop-types */
import React from "react";

import Item from "./Item.jsx";

import styled from "styled-components";

const RendererContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: ${(props) =>
    props.isMultiple
      ? `${props.currentIdx * -98}%`
      : `${props.currentIdx * -100}%`};

  transition: all 0.5s ease-in-out;
`;

export default function CarouselItemList({ data, currentIdx }) {
  return (
    <RendererContainer>
      <ItemsContainer currentIdx={currentIdx}>
        {data.map((item, index) => {
          return <Item data={item} key={index} />;
        })}
      </ItemsContainer>
    </RendererContainer>
  );
}
