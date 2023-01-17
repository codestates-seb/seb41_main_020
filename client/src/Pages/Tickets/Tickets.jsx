/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState, useEffect } from "react";

import SearchBar from "../../Components/Main/SearchBar.jsx";
import Button from "../../Components/Main/Button.jsx";
import ItemList from "../../Components/Ticktes/ItemList.jsx";
import SeoulMap from "../../Components/Main/Popups/SeoulMap.jsx";
import Overlay from "../../Components/Main/Popups/Overlay.jsx";

import breakpoint from "../../styles/breakpoint";
import {
  primary,
  sub,
  dtFontSize,
  mbFontSize,
  secondary,
} from "../../styles/mixins";
import { dummyArr } from "../../DummyData/mainDummy.js";
import "../../styles/ReactDatePicker.css";

import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

const ContentHeaderContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: space-between;
  min-height: 100px;
  padding: 30px 47px;
  width: 90%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px 5.13%;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    all: unset;
    color: ${primary.primary500};
    font-size: ${dtFontSize.xxlarge};
    font-weight: 700;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.xlarge};
    }
  }

  > h2 {
    all: unset;
    color: ${sub.sub400};
    font-size: ${dtFontSize.medium};
    font-weight: 400;
    margin: 5px 0 0 0;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

const SearchBarContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
  margin-bottom: 50px;
`;

const SearchBarMainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SearchBarExtended = styled(SearchBar)`
  width: 100%;
  justify-content: flex-start;
  padding: 0 10px;
  margin-top: 10px;
  max-width: 700px;

  .input_container {
    width: 80%;
  }

  .option_container {
    width: 20%;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: flex;
    width: 90%;
  }
`;

const ButtonExtended = styled(Button)`
  width: max-content;
  min-width: 120px;
  height: max-content;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-left: 0;
  }
`;

const ItemListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const SelectorContainer = styled.div`
  display: flex;
  margin-left: 40px;
  align-items: center;
  justify-content: center;

  .selector_group {
    display: flex;
    height: max-content;
    align-items: center;
    width: max-content;
    height: 100%;
    margin-left: 10px;
  }

  label {
    margin-right: 5px;
    font-weight: 600;
    color: ${primary.primary500};

    :hover {
      cursor: pointer;
    }
  }

  input {
    :hover {
      cursor: pointer;
    }
  }

  .mobile_top_selector_group {
    display: flex;
    align-items: center;
  }

  .dash {
    margin: 0 5px;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 80px;
  border-radius: 20px;
  background-color: transparent;
  border: none;
  font-weight: 600;
  color: white;
  margin-left: 3px;

  :focus-within {
    outline: none;
  }
`;

const DatePickerContainer = styled.div`
  width: max-content;
  height: 30px;
  font-weight: 800;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0 5px;
  background-color: ${primary.primary300};

  svg {
    margin: 0 5px;

    path {
      fill: white;
    }
  }

  :focus-within {
    outline: 1px solid ${primary.primary300};
    background-color: ${secondary.secondary400};
  }

  :hover {
    background-color: ${secondary.secondary400};
    cursor: pointer;
  }
`;

const SelectDateContainer = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
`;

const RadioGroup = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
`;

const LocationPopupContainer = styled.div`
  width: 80%;
  height: max-content;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;

  h1 {
    font-size: ${dtFontSize.xlarge};
    text-align: center;
    color: ${sub.sub800};
    margin-top: 10px;
  }

  .location {
    font-weight: 600;
  }

  .location_indicator_container {
    display: flex;
    align-items: center;
  }

  span {
    font-weight: 600;
    color: ${primary.primary300};
  }

  .reset_location {
    background-color: ${primary.primary300};
    padding: 5px;
    border-radius: 20px;
    color: white;
    margin-left: 10px;
    font-size: ${dtFontSize.small};

    :hover {
      cursor: pointer;
      background-color: ${secondary.secondary500};
    }
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

export default function Tickets() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [popupOpen, setPopupOpen] = useState(false);
  const [location, setLocation] = useState("없음");

  useEffect(() => {
    if (endDate < startDate) {
      window.alert("시작 날짜보다 이전 날짜를 선택할 수 없습니다.");
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [endDate]);

  const locationPopupClickHandler = (e) => {
    setLocation(e.target.attributes.value.value);
  };

  const locationButtonClickHandler = () => {
    setPopupOpen(true);
  };

  return (
    <Container>
      {popupOpen && (
        <Overlay>
          <LocationPopupContainer>
            <h1>검색할 지역 선택하기</h1>
            <SeoulMap clickHandler={locationPopupClickHandler} />
            <div className="location_indicator_container">
              <p className="location">
                선택한 위치 : <span>{location}</span>
              </p>
              <p
                className="reset_location"
                onClick={() => {
                  setLocation("없음");
                }}
              >
                초기화
              </p>
            </div>
            <CloseButton
              onClick={() => {
                setPopupOpen(false);
              }}
            >
              닫기
            </CloseButton>
          </LocationPopupContainer>
        </Overlay>
      )}
      <ContentHeaderContainer>
        <HeaderTitleContainer>
          <h1>공연 검색</h1>
          <h2>찾고자 하는 공연이 열리는 지역과 기간, 공연명을 입력하세요.</h2>
        </HeaderTitleContainer>
      </ContentHeaderContainer>
      <ContentContainer>
        <SearchBarContainer>
          <SelectorContainer>
            <SelectDateContainer>
              <DatePickerContainer>
                {/* calander 아이콘 */}
                <svg
                  width={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
                </svg>
                <StyledDatePicker
                  selected={startDate}
                  onChange={(startDate) => {
                    setStartDate(startDate);
                  }}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                />
              </DatePickerContainer>
              <svg className="dash" width={10} viewBox="0 0 448 512">
                <path
                  fill={primary.primary300}
                  d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                />
              </svg>
              <DatePickerContainer>
                {/* calander 아이콘 */}
                <svg
                  width={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
                </svg>
                <StyledDatePicker
                  selected={endDate}
                  onChange={(endDate) => {
                    setEndDate(endDate);
                  }}
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                />
              </DatePickerContainer>
            </SelectDateContainer>
            <div className="mobile_top_selector_group">
              <ButtonExtended clickEvent={locationButtonClickHandler}>
                {location}
              </ButtonExtended>
              <RadioGroup>
                <div className="selector_group">
                  <label htmlFor="all">전체</label>
                  <input
                    defaultChecked
                    id="all"
                    name="category"
                    type="radio"
                    value="전체"
                  />
                </div>
                <div className="selector_group">
                  <label htmlFor="music">음악</label>
                  <input id="music" name="category" type="radio" value="음악" />
                </div>
                <div className="selector_group">
                  <label htmlFor="play">연극</label>
                  <input id="play" name="category" type="radio" value="연극" />
                </div>
              </RadioGroup>
            </div>
          </SelectorContainer>
          <SearchBarMainContainer>
            <SearchBarExtended />
          </SearchBarMainContainer>
        </SearchBarContainer>
        <ItemListContainer>
          <ItemList data={dummyArr} />
        </ItemListContainer>
      </ContentContainer>
    </Container>
  );
}
