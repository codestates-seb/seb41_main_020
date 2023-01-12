/* eslint-disable react/prop-types */
import React from "react";

import { useState, useEffect, useCallback } from "react";

import { primary, sub } from "../../../styles/mixins";
import breakpoint from "../../../styles/breakpoint";
import Arrow from "../../../assets/arrow.svg";

import styled from "styled-components";

const CarouselContainer = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  /* max-height: ${(props) => props.height};
  min-height: ${(props) => props.height}; */
  background-color: ${sub.sub200};
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-bottom: 20px;
    padding: 20px 0;
  }
`;

const PrevButton = styled.button`
  width: 25px;
  height: 22px;
  border-radius: 100%;
  background-color: ${sub.sub400};
  border: 0;
  margin-left: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary200};
  }

  img {
    width: 10px;
    height: 10px;
    transform: rotate(180deg);
  }
`;

const NextButton = styled.button`
  width: 25px;
  height: 22px;
  border-radius: 100%;
  background-color: ${sub.sub400};
  border: 0;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary200};
  }

  img {
    width: 10px;
    height: 10px;
  }
`;

const Rank = styled.h2`
  position: absolute;
  font-size: calc(60px + 2vw);
  top: 42%;
  left: 12%;
  color: ${primary.primary200};
  font-style: italic;
  pointer-events: none;

  @media screen and (min-width: 1400px) {
    font-size: 100px;
  }
`;

export default function Carousel({
  width,
  height,
  data,
  carouselItemList,
  isRankMode,
  isMultiple,
  minWidth,
  maxWidth,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const CarouselItemList = carouselItemList;

  const pageButtonClickHandler = (num) => {
    if (isMultiple) {
      if (
        currentIdx + num < parseInt(data.length / 3) &&
        currentIdx + num >= 0
      ) {
        setCurrentIdx(currentIdx + num);
      }
    } else {
      if (currentIdx + num < data.length && currentIdx + num >= 0) {
        setCurrentIdx(currentIdx + num);
      }
    }
  };

  return (
    <CarouselContainer
      width={width}
      height={height}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <PrevButton
        onClick={() => {
          pageButtonClickHandler(-1);
        }}
      >
        <img src={Arrow} alt="prev" />
      </PrevButton>
      {CarouselItemList && (
        <CarouselItemList
          data={data}
          currentIdx={currentIdx}
          isMultiple={isMultiple}
        />
      )}
      {isRankMode && <Rank>{currentIdx + 1}</Rank>}
      <NextButton
        onClick={() => {
          pageButtonClickHandler(1);
        }}
      >
        <img src={Arrow} alt="next" />
      </NextButton>
    </CarouselContainer>
  );
}
