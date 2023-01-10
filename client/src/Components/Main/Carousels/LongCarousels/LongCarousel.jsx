import React, { useState } from "react";

import Arrow from "../../../../assets/arrow.svg";
import { primary, sub } from "../../../../styles/mixins";

import styled from "styled-components";

const CarouselContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${sub.sub200};
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const PrevButton = styled.button`
  width: 30px;
  padding: 7px 0;
  border-radius: 50px;
  background-color: ${sub.sub400};
  border: 0;
  margin-left: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary200};
  }

  img {
    width: 12px;
    height: 12px;
    transform: rotate(180deg);
  }
`;

const NextButton = styled.button`
  width: 30px;
  padding: 7px 0;
  border-radius: 50px;
  background-color: ${sub.sub400};
  border: 0;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary200};
  }

  img {
    width: 12px;
    height: 12px;
  }
`;

const Rank = styled.h2`
  position: absolute;
  font-size: 140px;
  top: 43%;
  left: 6%;
  color: ${primary.primary200};
  font-style: italic;
`;

export default function LongCarousel() {
  // const [currentIdx, setCurrentIdx] = useState(0);

  // const pageButtonClickHandler = (num) => {
  //   if (currentIdx + num < data.length && currentIdx + num >= 0) {
  //     setCurrentIdx(currentIdx + num);
  //   }
  // };

  return (
    <CarouselContainer>
      <PrevButton>
        <img src={Arrow} alt="prev" />
      </PrevButton>
      {renderer && <Renderer data={data} currentIdx={currentIdx} />}
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
