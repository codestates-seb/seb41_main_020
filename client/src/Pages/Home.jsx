import React, { useState } from "react";

import Banner from "../Components/Main/Banner.jsx";
import SearchBar from "../Components/Main/SearchBar.jsx";
import Button from "../Components/Main/Button.jsx";
import Carousel from "../Components/Main/Carousels/Carousel.jsx";
import CarouselItemList from "../Components/Main/Carousels/CarouselItemList.jsx";
import Boards from "../Components/Main/Boards/Boards.jsx";
import Overlay from "../Components/Main/Popups/Overlay.jsx";
import LocationPopup from "../Components/Main/Popups/LocationPopup.jsx";
import LongCarousel from "../Components/Main/Carousels/LongCarousel.jsx";
import DatePopup from "../Components/Main/Popups/DatePopup.jsx";

import styled from "styled-components";
import { dtFontSize, primary } from "../styles/mixins.js";
import breakpoint from "../styles/breakpoint.js";
import { dummyArr } from "../DummyData/mainDummy.js";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 30vh;
  min-height: 200px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin: 30px 0;
    max-height: max-content;
    height: max-content;
  }
`;

const CarouselDisplayBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 0 10%;
`;

const CarouselDisplay = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
  }

  .carousel_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    h1 {
      color: ${primary.primary500};
      font-size: ${dtFontSize.large};
      margin-bottom: 10px;
      width: 73%;
      height: max-content;
      text-align: start;
    }
  }
`;

const LongCarouselContainer = styled.div`
  width: 100%;
  height: 35vh;
  min-height: 300px;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 0 13vw; */

  .longcarousel_display {
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .longcarousel_header_container {
    display: flex;
    width: 100%;
    margin-left: 10px;
    justify-content: flex-start;
  }

  .longcarousel_display {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 68vw;
    height: 35vh;
  }

  .my_location {
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
  min-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h1.title {
    width: 80%;
    color: ${primary.primary500};
    font-size: ${dtFontSize.large};
    margin-bottom: 5px;
    text-align: start;

    @media screen and (max-width: ${breakpoint.mobile}) {
      text-align: center;
      background-color: ${primary.primary300};
      color: white;
      margin-left: 0;
      width: 80%;
      padding: 10px 0;
      border-radius: 20px;
    }
  }
`;

const BoardsGrid = styled.div`
  min-width: 850px;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  column-gap: 10px;
  row-gap: 20px;
  justify-content: center;
  margin-top: 30px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    grid-template-columns: repeat(1, 45%);
  }
`;

export default function Home() {
  const [LocationPopupOpen, setLocationPopupOpen] = useState(false);
  const [DatePopupOpen, setDatePopupOpen] = useState(false);

  const locationPopupOnClickHandler = () => {
    setLocationPopupOpen(true);
  };

  const datePopupOnClickHanlder = () => {
    setDatePopupOpen(true);
  };

  return (
    <>
      {/* <Header /> */}
      <MainContainer>
        {LocationPopupOpen && (
          <Overlay>
            <LocationPopup popupHandler={setLocationPopupOpen} />
          </Overlay>
        )}
        {DatePopupOpen && (
          <Overlay>
            <DatePopup popupHandler={setDatePopupOpen}></DatePopup>
          </Overlay>
        )}
        <Banner />
        <ButtonsContainer>
          <Button clickEvent={locationPopupOnClickHandler}>
            지역별 공연 현황
          </Button>
          <Button clickEvent={datePopupOnClickHanlder}>날짜별 공연 현황</Button>
        </ButtonsContainer>
        <SearchBar navigateTo="/tickets" fetchMode={false} defaultValue={""} />
        <CarouselContainer>
          <CarouselDisplayBox>
            <CarouselDisplay>
              <div className="carousel_box">
                <h1>월간 예매율 순위</h1>
                <Carousel
                  width={"80%"}
                  minWidth={"300px"}
                  maxWidth={"480px"}
                  height={"100%"}
                  sort="hot"
                  carouselItemList={CarouselItemList}
                  isRankMode={true}
                ></Carousel>
              </div>
              <div className="carousel_box">
                <h1>새로 추가된 공연</h1>
                <Carousel
                  width={"80%"}
                  minWidth={"300px"}
                  maxWidth={"480px"}
                  height={"100%"}
                  sort="new"
                  carouselItemList={CarouselItemList}
                ></Carousel>
              </div>
            </CarouselDisplay>
          </CarouselDisplayBox>
        </CarouselContainer>
        <LongCarouselContainer>
          <LongCarousel />
        </LongCarouselContainer>
        <BoardsContainer>
          <h1 className="title">커뮤니티 인기 게시글</h1>
          <BoardsGrid>
            <Boards category="자유게시판">자유게시판</Boards>
            <Boards category="구인게시판">구인게시판</Boards>
            <Boards category="초청게시판">초청게시판</Boards>
            <Boards category="홍보게시판">홍보게시판</Boards>
            <Boards category="후기게시판">공연후기</Boards>
          </BoardsGrid>
        </BoardsContainer>
      </MainContainer>
    </>
  );
}
