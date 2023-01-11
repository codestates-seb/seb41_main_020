import React, { useState } from "react";

import Header from "../Components/Header.jsx";
import Banner from "../Components/Main/Banner.jsx";
import SearchBar from "../Components/Main/SearchBar.jsx";
import Button from "../Components/Main/Button.jsx";
import Carousel from "../Components/Main/Carousels/Carousel.jsx";
import Renderer from "../Components/Main/Carousels/Renderer.jsx";
import Boards from "../Components/Main/Boards/Boards.jsx";
import Overlay from "../Components/Main/Popups/Overlay.jsx";
import LocationPopup from "../Components/Main/Popups/LocationPopup.jsx";

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
  justify-content: center;
  margin: 50px;
`;

const CarouselDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: max-content;
  align-items: center;

  h1 {
    color: ${primary.primary500};
    font-size: ${dtFontSize.large};
    margin-bottom: 10px;
    width: 83%;
    text-align: start;
  }
`;

const LongCarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 180px;
  align-items: center;

  .longcarousel_header_container {
    margin-left: 70px;
    display: flex;
    width: 100%;
    justify-content: flex-start;
  }

  button {
    margin-left: 30px;
    font-weight: 600;
  }

  h1 {
    color: ${primary.primary500};
    font-size: ${dtFontSize.large};
    text-align: center;
    padding-top: 18px;
  }
`;

const BoardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h1.title {
    width: 78%;
    color: ${primary.primary500};
    font-size: ${dtFontSize.large};
    margin-bottom: 5px;
    text-align: start;
    margin-left: 120px;
  }
`;

const BoardsGrid = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  column-gap: 10px;
  row-gap: 20px;
  justify-content: center;
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
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);

  const locationPopupOnClickHandler = () => {
    setIsLocationPopupOpen(true);
  };

  return (
    <MainContainer>
      {isLocationPopupOpen && (
        <Overlay>
          <LocationPopup popupHandler={setIsLocationPopupOpen} />
        </Overlay>
      )}
      <Header />
      <Banner />
      <ButtonsContainer>
        <Button clickEvent={locationPopupOnClickHandler}>
          지역별 공연 현황
        </Button>
        <Button>날짜별 공연 현황</Button>
      </ButtonsContainer>
      <SearchBar />
      <CarouselContainer>
        <CarouselDisplay>
          <h1>월간 예매율 순위</h1>
          <Carousel
            width={"85%"}
            height={"260px"}
            data={dummyArr}
            renderer={Renderer}
            isRankMode={true}
          ></Carousel>
        </CarouselDisplay>
        <CarouselDisplay>
          <h1>새로 추가된 공연</h1>
          <Carousel
            width={"85%"}
            height={"260px"}
            data={dummyArr}
            renderer={Renderer}
          ></Carousel>
        </CarouselDisplay>
      </CarouselContainer>
      <LongCarouselContainer>
        <div className="longcarousel_header_container">
          <h1>내 지역 공연 현황</h1>
          <Button>나의 위치: 종로구</Button>
        </div>
        <Carousel
          width={"95%"}
          height={"250px"}
          data={dummyArr}
          renderer={Renderer}
          isMultiple={true}
        ></Carousel>
      </LongCarouselContainer>
      <BoardsContainer>
        <h1 className="title">커뮤니티 인기 게시글</h1>
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
