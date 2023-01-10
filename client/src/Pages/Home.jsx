import React, { useState } from "react";

import Header from "../Components/Header.jsx";
import Banner from "../Components/Main/Banner.jsx";
import SearchBar from "../Components/Main/SearchBar.jsx";
import Button from "../Components/Main/Button.jsx";
import Carousel from "../Components/Main/Carousels/Carousel.jsx";
import Renderer from "../Components/Main/Carousels/Renderer.jsx";
import Boards from "../Components/Main/Boards/Boards.jsx";

import styled from "styled-components";
import { dtFontSize, primary } from "../styles/mixins.js";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: max-content;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;

const CarouselDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: max-content;

  h1 {
    color: ${primary.primary500};
    font-size: ${dtFontSize.xlarge};
    margin-bottom: 10px;
  }
`;

const LognCarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  .longcarousel_header_container {
    margin-left: 20px;
    display: flex;
    width: 88%;
    justify-content: flex-start;
  }

  button {
    margin-left: 30px;
    font-weight: 700;
  }

  h1 {
    color: ${primary.primary500};
    font-size: ${dtFontSize.xlarge};
    text-align: center;
    padding-top: 10px;
  }
`;

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h1 {
    width: 88%;
    color: ${primary.primary500};
    font-size: ${dtFontSize.xlarge};
    margin-bottom: 10px;
  }
`;

const BoardsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 530px);
  column-gap: 122px;
  row-gap: 80px;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const dummyObj = {
  title: "Rock Night Party",
  artist: "우리동네 락밴드",
  detail: "공연 상세 내용",
  date: "2022.03.08 ~ 2022.03.09 (목) 18:00",
  location: "종로구 종로운동장",
  img: "https://dictionary.cambridge.org/ko/images/thumb/poster_noun_002_28550.jpg?version=5.0.286",
};

const dummyArr = new Array(9).fill(dummyObj);
console.log(dummyArr);

export default function Home() {
  return (
    <MainContainer>
      <Header />
      <Banner />
      <ButtonsContainer>
        <Button>지역별 공연 현황</Button>
        <Button>날짜별 공연 현황</Button>
      </ButtonsContainer>
      <SearchBar />
      <CarouselContainer>
        <CarouselDisplay>
          <h1>월간 예매율 순위</h1>
          <Carousel
            width={"100%"}
            height={"280px"}
            data={dummyArr}
            renderer={Renderer}
            isRankMode={true}
          ></Carousel>
        </CarouselDisplay>
        <CarouselDisplay>
          <h1>새로 추가된 공연</h1>
          <Carousel
            width={"100%"}
            height={"280px"}
            data={dummyArr}
            renderer={Renderer}
          ></Carousel>
        </CarouselDisplay>
      </CarouselContainer>
      <LognCarouselContainer>
        <div className="longcarousel_header_container">
          <h1>내 지역 공연 현황</h1>
          <Button>나의 위치: 종로구</Button>
        </div>
        <Carousel
          width={"88%"}
          height={"280px"}
          data={dummyArr}
          renderer={Renderer}
          isMultiple={true}
        ></Carousel>
      </LognCarouselContainer>
      <BoardsContainer>
        <h1>커뮤니티 인기 게시글</h1>
        <BoardsGrid>
          <Boards>자유게시판</Boards>
          <Boards>구인게시판</Boards>
          <Boards>요청게시판</Boards>
          <Boards>홍보게시판</Boards>
          <Boards>공연후기</Boards>
        </BoardsGrid>
      </BoardsContainer>
    </MainContainer>
  );
}
