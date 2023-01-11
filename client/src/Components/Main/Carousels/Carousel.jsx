/* eslint-disable react/prop-types */
import React from "react";

import { useState, useEffect } from "react";

import { primary, sub } from "../../../styles/mixins";
import Arrow from "../../../assets/arrow.svg";

import styled from "styled-components";

const CarouselContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${sub.sub200};
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: relative;
`;

const PrevButton = styled.button`
  width: 25px;
  padding: 3px 0;
  border-radius: 50px;
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
  padding: 3px 0;
  border-radius: 50px;
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
  font-size: 100px;
  top: 42%;
  left: 8%;
  color: ${primary.primary200};
  font-style: italic;
  pointer-events: none;
`;

export default function Carousel({
  width,
  height,
  data,
  renderer,
  isRankMode,
  isMultiple,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const Renderer = renderer;

  useEffect(() => {
    console.log(currentIdx);
  }, [currentIdx]);

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
    <CarouselContainer width={width} height={height}>
      <PrevButton
        onClick={() => {
          pageButtonClickHandler(-1);
        }}
      >
        <img src={Arrow} alt="prev" />
      </PrevButton>
      {renderer && (
        <Renderer data={data} currentIdx={currentIdx} isMultiple={isMultiple} />
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
