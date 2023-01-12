/* eslint-disable react/prop-types */
import React from "react";

import Item from "./Item.jsx";
import MultipleItem from "./MultipleItem.jsx";

import styled from "styled-components";

const RendererContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-left: 20px;
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

export default function Renderer({ data, currentIdx, isMultiple }) {
  console.log(data);

  return (
    <RendererContainer>
      <ItemsContainer currentIdx={currentIdx} isMultiple={isMultiple}>
        {data.map((item, index) => {
          if (isMultiple) {
            return <MultipleItem data={item} key={index} />;
          }
          return <Item data={item} key={index} />;
        })}
      </ItemsContainer>
    </RendererContainer>
  );
}
