import React, { useState, useRef, useCallback, useEffect } from "react";

/* eslint-disable react/prop-types */

import List from "./List.jsx";
import Calendar from "./Calendar.jsx";
import { primary, sub, secondary, dtFontSize } from "../../../styles/mixins";
import breakpoint from "../../../styles/breakpoint.js";

import styled from "styled-components";

const PopupContainer = styled.div`
  z-index: 40;
  width: 80%;
  height: 650px;
  background-color: ${sub.sub100};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: ${dtFontSize.xlarge};
    text-align: center;
    color: ${sub.sub800};
    margin-top: 10px;
  }
`;

const CalendarContainer = styled.div`
  width: 40%;
  height: 100%;
  min-width: 400px;
  /* min-height: 500px; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
    min-height: 100px;
    padding-top: 30px;
  }
`;

const CloseButton = styled.button`
  width: 30%;
  max-width: 180px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid ${sub.sub800};
  color: ${sub.sub800};
  margin: 10px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary300};
    color: white;
    border-color: ${primary.primary300};
  }
`;

const PopupLowerContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ContentsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: space-evenly;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const ConcertListContainer = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5%;
  margin-top: 20px;

  .location {
    width: max-content;
    padding: 5px 30px;
    border-radius: 20px;
    background-color: ${primary.primary300};
    color: white;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: row;
    justify-content: space-evenly;
    height: 40%;
    width: 100%;
    margin-top: 0;
  }
`;

export default function DatePopup({ popupHandler }) {
  const [selectedDate, setSelectedDate] = useState("");

  console.log(selectedDate);

  const closePopupHandler = () => {
    popupHandler(false);
  };

  return (
    <PopupContainer>
      <h1>날짜별 공연 현황</h1>
      <ContentsContainer>
        <CalendarContainer>
          <Calendar setSelectedDate={setSelectedDate} />
        </CalendarContainer>
        <ConcertListContainer>
          <div className="location">{`${selectedDate} : 15개`}</div>
          <List />
        </ConcertListContainer>
      </ContentsContainer>
      <PopupLowerContainer>
        <CloseButton onClick={closePopupHandler}>닫기</CloseButton>
      </PopupLowerContainer>
    </PopupContainer>
  );
}