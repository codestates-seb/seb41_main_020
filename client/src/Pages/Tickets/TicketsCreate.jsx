import { PageWrapper } from "../Boards/Board/BoardList.jsx";
import {
  PostWrapper,
  PostBoard,
  TitleInputDiv,
  ContentInputDiv,
} from "../Boards/Board/BoardCreate.jsx";
import breakpoint from "../../styles/breakpoint.js";

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
    border: 2px solid ${primary.primary400};
    margin-bottom: 5px;
  }

  .placeInput {
    background-color: white;
    width: 100%;
    height: max-content;
    border-radius: 10px;
    padding: 8px;
    border: 2px solid ${primary.primary400};
    margin-bottom: 5px;
    font-size: ${dtFontSize.medium};
  }
`;

const DatePickerDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  margin-bottom: 50px;
  color: ${primary.primary200};
  font-size: ${dtFontSize.xlarge};
  font-weight: 700;
`;

export const ChoiceButton = styled(OKButton)`
  width: 150px;
  height: 30px;
`;

const ButtonDiv = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
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

const CancelButton = styled(PostButton)`
  margin-left: 50px;
  background-color: ${misc.lightred};
`;
export default function TicketsCreate() {
  const [ticketsValue, setTicketsValue] = useState("");
  const [place, setPlace] = useState("공연장소");
  const [startDate, setStartDate] = useState("");
  const [lastDate, setLastDate] = useState("");

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
          <div className="postDiv">공연명</div>
          <TicketsCreateInputDiv>
            <input
              className="titleInput"
              placeholder="게시글의 제목을 작성해주세요."
            />
          </TicketsCreateInputDiv>

          <div className="postDiv">공연 포스터</div>
          <div className="postDiv">공연 장소</div>
          <ChoiceButtonDiv>
            <div className="place">{place}</div>
            <input className="placeInput" placeholder="상세 주소 입력" />
            <Postcode setPlace={setPlace}></Postcode>
          </ChoiceButtonDiv>

          <div className="postDiv">공연 기간</div>
          <DatePickerDiv>
            <ReactDatePicker setDate={setStartDate}></ReactDatePicker>~~
            <ReactDatePicker setDate={setLastDate}></ReactDatePicker>
            {console.log(startDate)}
            {console.log(lastDate)}
          </DatePickerDiv>
          <div className="postDiv">공연 좌석 수</div>
          <TicketsCreateInputDiv>
            <input
              className="contentInput"
              placeholder="공연 좌석 수를 입력해주세요."
            />
          </TicketsCreateInputDiv>
          <div className="postDiv">티켓 가격</div>
          <TicketsCreateInputDiv>
            <input
              className="contentInput"
              placeholder="티켓 가격을 입력해주세요"
            />{" "}
            원
          </TicketsCreateInputDiv>
          <div className="postDiv">공연 상세</div>
          <TicketsCreateInputDiv>
            <textarea className="textAreaInput"></textarea>
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
