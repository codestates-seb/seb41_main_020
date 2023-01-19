/* eslint-disable react/prop-types */
import React from "react";

import LongCarouselItem from "./LongCarouselItem.jsx";

import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  width: 837px;
  max-width: 837px;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 1100px) {
    width: calc(20px + 80vw);
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  height: 100%;
  padding-left: 10px;
  margin-left: ${(props) => props.currentIdx * -100}%;

  transition: ${(props) => (props.isLast ? "unset" : "all 0.5s ease-in-out")};

  @media screen and (max-width: 900px) {
    margin-left: ${(props) => props.currentIdx * -100}%;
  }
`;

export default function LongCarouselItemList({ data, currentIdx }) {
  return (
    <ListContainer>
      <ItemsContainer currentIdx={currentIdx} isLast={currentIdx === 0}>
        {data.map((item, index) => (
          <LongCarouselItem data={item} key={index} />
        ))}
      </ItemsContainer>
    </ListContainer>
  );
}
