/* eslint-disable react/prop-types */
import React from "react";

import { useState } from "react";

import { primary, sub, dtFontSize } from "../../../styles/mixins";
import Arrow from "../../../assets/arrow.svg";

import Button from "../Button.jsx";
import LongCarouselItemList from "./LongCarouselItemList.jsx";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselHeader = styled.div`
  display: flex;
  width: 100%;

  h1 {
    width: max-content;
    margin-left: 20px;
    color: ${primary.primary500};
    font-size: ${dtFontSize.large};
    text-align: center;
    padding-top: 18px;
  }

  @media screen and (max-width: 1100px) {
    width: 90vw;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background-color: ${sub.sub200};
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1100px) {
    width: 90vw;
  }
`;

const PrevButton = styled.button`
  width: 24px;
  height: 23px;
  border-radius: 100%;
  background-color: ${sub.sub400};
  border: 0;
  margin-left: 0;
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
  width: 24px;
  height: 23px;
  border-radius: 100%;
  background-color: ${sub.sub400};
  border: 0;
  margin-left: 0;
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

export default function Carousel({ data }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const pageButtonClickHandler = (num) => {
    const viewport = window.innerWidth;

    if (viewport > 900) {
      if (
        currentIdx + num < parseInt(data.length / 3) &&
        currentIdx + num >= 0
      ) {
        setCurrentIdx(currentIdx + num);
      }
    } else {
      if (data.length % 2) {
        if (
          currentIdx + num < parseInt(data.length / 4) + 1 &&
          currentIdx + num >= 0
        ) {
          setCurrentIdx(currentIdx + num);
        }
      } else {
        if (
          currentIdx + num < parseInt(data.length / 4) &&
          currentIdx + num >= 0
        ) {
          setCurrentIdx(currentIdx + num);
        }
      }
    }
  };

  return (
    <Container>
      <CarouselHeader>
        <h1>내 지역 공연 현황</h1>
        <Button className="my_location">나의 위치: 종로구</Button>
      </CarouselHeader>
      <CarouselContainer>
        <PrevButton
          onClick={() => {
            pageButtonClickHandler(-1);
          }}
        >
          <img src={Arrow} alt="prev" />
        </PrevButton>
        <LongCarouselItemList data={data} currentIdx={currentIdx} />
        <NextButton
          onClick={() => {
            pageButtonClickHandler(1);
          }}
        >
          <img src={Arrow} alt="next" />
        </NextButton>
      </CarouselContainer>
    </Container>
  );
}
