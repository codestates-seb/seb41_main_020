import { PageWrapper, ContentWrapper } from "../Boards/Board.jsx";
import {
  PostBoard,
  TitleInputDiv,
  ContentInputDiv,
} from "../Boards/Post/PostCreate.jsx";
import { dtFontSize, sub, misc } from "../../styles/mixins.js";
import OKButton from "../../Components/OKButton.jsx";
import Editor from "../../Components/Editor.jsx";

import React, { useState } from "react";
import styled from "styled-components";

const TicketsCreateContentWrapper = styled(ContentWrapper)`
  margin-left: 285.438px;
  width: 80vw;
`;

const TicketsBoard = styled(PostBoard)`
  height: 1450px;
`;

const TicketsCreateInputDiv = styled(TitleInputDiv)`
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
  background-color: green;
  text-align: left;
  margin-bottom: 20px;
`;

const ChoiceButton = styled(OKButton)`
  width: 150px;
  height: 40px;
`;

const ButtonDiv = styled.div`
  margin-left: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
`;

const PostButton = styled(OKButton)`
  width: 200px;
  height: 50px;
`;

const CancelButton = styled(PostButton)`
  margin-left: 50px;
  background-color: ${misc.lightred};
`;
export default function TicketsCreate() {
  const [ticketsValue, setTicketsValue] = useState("");
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
            <ChoiceButton>공연 장소 선택하기</ChoiceButton>
          </ChoiceButtonDiv>

          <div className="postDiv">공연 기간</div>
          <ChoiceButtonDiv>
            <ChoiceButton>공연 장소 선택하기</ChoiceButton>
          </ChoiceButtonDiv>
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
