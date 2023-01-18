import { PageWrapper } from "../Boards/Board/BoardList.jsx";
import {
  PostWrapper,
  PostBoard,
  TitleInputDiv,
  ContentInputDiv,
} from "../Boards/Board/BoardCreate.jsx";
import breakpoint from "../../styles/breakpoint.js";
import CategoryDropdown from "../../Components/Board/TicketsCreate/CategoryDropdown.jsx";

import {
  dtFontSize,
  sub,
  misc,
  secondary,
  mbFontSize,
  primary,
} from "../../styles/mixins.js";
import OKButton from "../../Components/Board/BoardList/OKButton.jsx";
import Editor from "../../Components/Board/BoardCreate/Editor.jsx";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Postcode } from "../../Components/Board/TicketsCreate/Postcode";
import ReactDatePicker from "../../Components/Board/TicketsCreate/ReactDatePicker.jsx";

const TicketsCreateContentWrapper = styled(PostWrapper)`
  @media screen and (max-width: ${breakpoint.mobile}) {
    /* width: 90%; */
  } ;
`;

const TicketsBoard = styled(PostBoard)`
  height: max-content;
  width: 100%;

  .postDiv {
    font-size: ${dtFontSize.medium};
    margin-bottom: 10px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

const TicketsCreateInputDiv = styled(TitleInputDiv)`
  padding-top: 0;
  font-size: ${dtFontSize.medium};
  font-weight: 600;
  .titleInput {
    width: 100%;
    height: 35px;
    border: 1px solid ${sub.sub400};
    border-radius: 10px;
    padding-left: 10px;
  }

  .contentInput {
    width: 50%;
    height: 35px;
    border: 1px solid ${sub.sub400};
    border-radius: 10px;
    padding-left: 10px;
  }

  .textAreaInput {
    width: 100%;
    height: 250px;
    border: 1px solid ${sub.sub400};
    border-radius: 10px;
    resize: none;
    padding-top: 10px;
    padding-left: 10px;
  }
`;

const ChoiceButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 50px;

  .place {
    background-color: white;
    width: max-content;
    height: max-content;
    border-radius: 10px;
    padding: 8px;
    border: 1px solid ${sub.sub400};
    margin-bottom: 5px;
  }

  .placeInput {
    background-color: white;
    width: 100%;
    height: max-content;
    border-radius: 10px;
    padding: 8px;
    border: 1px solid ${sub.sub400};
    margin-bottom: 5px;
    font-size: ${dtFontSize.medium};
  }
`;

const DatePickerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  color: ${primary.primary500};
  font-size: ${dtFontSize.medium};
  font-weight: 700;
  text-align: left;

  .DatePickerInfoDiv {
    display: flex;
    margin: 5px 0;

    .DatePickerInput {
      padding: 5px;
      border: 1px solid ${sub.sub400};
      border-radius: 5px;
      width: 200px;
      height: 30px;
    }
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${dtFontSize.small};
  }
`;

export const ChoiceButton = styled(OKButton)`
  width: 150px;
  height: 30px;

  &.complete {
    background-color: ${secondary.secondary500};
  }
`;

const ButtonDiv = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  @media screen and (max-width: ${breakpoint.mobile}) {
    display: flex;
  }
`;

const PostButton = styled(OKButton)`
  width: 200px;
  height: 50px;

  &:hover {
    background-color: ${secondary.secondary500};
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 150px;
    font-size: ${mbFontSize.medium};
  }
`;

const CategoryDiv = styled.div`
  text-align: left;
  margin-bottom: 50px;
`;

const CancelButton = styled(PostButton)`
  margin-left: 50px;
  background-color: ${misc.lightred};
`;

export default function TicketsCreate() {
  // 카테고리
  const [category, setCategory] = useState("");
  // 공연명
  const [ticketName, setTicketName] = useState("");
  // 장소
  const [gu, setGu] = useState("구");
  const [place, setPlace] = useState("공연장소");

  // 공연 시작 정보
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");

  // 공연 좌석 수
  const [sit, setSit] = useState("");
  // 티켓 가격
  const [ticketPrice, setTicketPrice] = useState("");
  // 공연 상세
  const [ticketInfo, setTicketInfo] = useState("");
  // quill 에디터
  const [ticketsValue, setTicketsValue] = useState("");

  console.log(category);
  console.log(ticketName);
  console.log(gu);
  console.log(place);
  console.log(startDate);
  console.log(endDate);
  console.log(startTime);
  console.log(sit);
  console.log(ticketPrice);
  console.log(ticketInfo);
  console.log(ticketsValue);

  useEffect(() => {
    const { kakao } = window;
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      place,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0].x);
          console.log(result[0].y);
        }
      },
      [place]
    );
  });

  return (
    <PageWrapper>
      <TicketsCreateContentWrapper>
        <div className="title">판매글 올리기</div>
        <div className="titleInfo">
          판매글 양식을 준수하여 게시글을 작성해주시기 바랍니다.
        </div>
        <TicketsBoard>
          <div className="postDiv">카테고리</div>
          <CategoryDiv>
            <CategoryDropdown setCategory={setCategory}></CategoryDropdown>
          </CategoryDiv>
          <div className="postDiv">공연명</div>
          <TicketsCreateInputDiv>
            <input
              className="titleInput"
              placeholder="게시글의 제목을 작성해주세요."
              value={ticketName}
              onChange={(e) => {
                setTicketName(e.target.value);
              }}
            />
          </TicketsCreateInputDiv>

          <div className="postDiv">공연 포스터</div>
          <div className="postDiv">공연 장소</div>
          <ChoiceButtonDiv>
            <div className="place">{place}</div>
            <input className="placeInput" placeholder="상세 주소 입력" />
            <Postcode setPlace={setPlace} setGu={setGu}></Postcode>
          </ChoiceButtonDiv>

          <div className="postDiv">공연 기간</div>
          <DatePickerDiv>
            시작일
            <div className="DatePickerInfoDiv">
              <ReactDatePicker setDate={setStartDate}></ReactDatePicker>
            </div>
            종료일
            <div className="DatePickerInfoDiv">
              <ReactDatePicker setDate={setEndDate}></ReactDatePicker>
            </div>
            시작시간 - 숫자만 입력 (ex: 9)
            <div className="DatePickerInfoDiv">
              <input
                type="text"
                className="DatePickerInput"
                placeholder="시작 시간"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </div>
          </DatePickerDiv>
          <div className="postDiv">공연 좌석 수</div>
          <TicketsCreateInputDiv>
            <input
              className="contentInput"
              placeholder="공연 좌석 수를 입력해주세요."
              value={sit}
              onChange={(e) => {
                setSit(e.target.value);
              }}
            />
          </TicketsCreateInputDiv>
          <div className="postDiv">티켓 가격</div>
          <TicketsCreateInputDiv>
            <input
              className="contentInput"
              placeholder="티켓 가격을 입력해주세요"
              value={ticketPrice}
              onChange={(e) => {
                setTicketPrice(e.target.value);
              }}
            />{" "}
            원
          </TicketsCreateInputDiv>
          <div className="postDiv">공연 상세</div>
          <TicketsCreateInputDiv>
            <textarea
              className="textAreaInput"
              value={ticketInfo}
              onChange={(e) => {
                setTicketInfo(e.target.value);
              }}
            ></textarea>
          </TicketsCreateInputDiv>
          <div className="postDiv">상세 설명</div>
          <ContentInputDiv>
            <Editor
              value={ticketsValue}
              setValue={setTicketsValue}
              placeholder={"내용을 입력해주세요."}
            ></Editor>
          </ContentInputDiv>
        </TicketsBoard>

        <ButtonDiv>
          <PostButton>글 올리기</PostButton>
          <CancelButton>취소하기</CancelButton>
        </ButtonDiv>
      </TicketsCreateContentWrapper>
    </PageWrapper>
  );
}
