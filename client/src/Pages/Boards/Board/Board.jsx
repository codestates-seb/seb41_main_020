//페이지, 리액트 컴포넌트, 정적 파일
import breakpoint from "../../../styles/breakpoint.js";
import { PageWrapper, ContentWrapper, BoardItem } from "./BoardList.jsx";
import Aside from "../Aside/Aside.jsx";
import heart from "../../../assets/heart.svg";
import AnswerList from "../../../Components/Board/Answer/AnswerList";

//로컬 모듈
import {
  primary,
  dtFontSize,
  sub,
  mbFontSize,
} from "../../../styles/mixins.js";

//라이브러리 및 라이브러리 메소드
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const QuillViewDiv = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 60px;
  height: max-content;
`;

const HeartItem = styled(BoardItem)`
  justify-content: center;
  .heartButton {
    margin-bottom: 5px;
    border: white;
    cursor: pointer;
  }

  .heartCount {
    color: ${primary.primary500};
    font-size: ${dtFontSize.xlarge};
    font-weight: 700;
    margin-bottom: 80px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.xlarge};
    }
  }
`;

const EditDeleteDiv = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 3px;
  .edButton {
    cursor: pointer;
    width: 40px;
    height: 20px;
    border: none;
    background-color: white;
    color: ${sub.sub400};
    margin-right: 5px;
  }
`;

const Board = () => {
  const navigate = useNavigate();

  // const axiosBoard = async () => {
  //   const response = await axios.get(
  //     `http://ec2-13-125-98-211.ap-northeast-2.compute.amazonaws.com/articles`,
  //     { withCredentials: true }
  //   );
  //   return response.data.data;
  // };

  // const { isLoading, isError, data, error } = useQuery(
  //   ["axiosBoard"],
  //   axiosBoard
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error : {error.message}</div>;
  // }

  // console.log(data);

  return (
    <PageWrapper>
      <Aside></Aside>
      <ContentWrapper>
        <div className="title">글 제목(ex 난 누구인가 여긴 어디인가)</div>
        <div className="titleInfo">작성날짜,작성자</div>
        <div className="lineDiv"></div>
        <QuillViewDiv>본문 내용 입니다.</QuillViewDiv>
        <HeartItem>
          <div className="likeDiv">
            <button className="heartButton">
              <img width={45} src={heart} alt="heart"></img>
            </button>
            <div className="heartCount">157</div>
          </div>
        </HeartItem>
        <EditDeleteDiv>
          <button
            className="edButton"
            onClick={() => {
              navigate("/board/1/edit");
            }}
          >
            수정
          </button>
          <button className="edButton">삭제</button>
        </EditDeleteDiv>
        <AnswerList />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Board;
