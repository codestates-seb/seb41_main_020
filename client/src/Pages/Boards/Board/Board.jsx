//페이지, 리액트 컴포넌트, 정적 파일
import breakpoint from "../../../styles/breakpoint.js";
import { PageWrapper, ContentWrapper, BoardItem } from "./BoardList.jsx";
import Aside from "../Aside/Aside.jsx";
import heart from "../../../assets/heart.svg";
import AnswerList from "../../../Components/Board/Answer/AnswerList";
import instance from "../../../api/core/default.js";

//로컬 모듈
import {
  primary,
  dtFontSize,
  sub,
  mbFontSize,
} from "../../../styles/mixins.js";

//라이브러리 및 라이브러리 메소드
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useBoardStore from "../../../store/useBoardStore.js";

const BoardInfoWrapper = styled(ContentWrapper)`
  .titleDiv {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: ${dtFontSize.xlarge};
      color: ${primary.primary500};
      font-weight: 700;
      text-align: left;

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.xlarge};
      }
    }
    .titleInfo {
      font-size: ${dtFontSize.medium};
      margin-top: 10px;
      color: ${sub.sub300};
      text-align: left;
      margin-bottom: 10px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.medium};
      }
    }
  }
`;

const QuillViewDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
  height: max-content;
  text-align: left;
  padding-left: 10px;
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
  const [boardData, setBoardData] = useState({});
  const [answerListData, setAnswerListData] = useState([]);
  const { id } = useParams();
  const { setBoardStoreData } = useBoardStore();
  const { pathname } = useLocation();

  const axiosBoard = async () => {
    const response = await axios.get(`http://indiego.kro.kr:80/articles/${id}`);
    return response.data;

    // const response = await instance({
    //   method: "get",
    //   url: `http://indiego.kro.kr:80/articles/${id}`,
    // });
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // console.log(response.data);
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // return response.data;
  };

  const axiosBoardSuccess = (response) => {
    setBoardData(response.data);
    setAnswerListData(response.data.articleComments);
    setBoardStoreData(response.data);
  };

  const { isLoading, isError, error } = useQuery({
    queryKey: ["axiosBoard"],
    queryFn: axiosBoard,
    onSuccess: axiosBoardSuccess,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }
  return (
    <PageWrapper>
      <Aside></Aside>
      <BoardInfoWrapper>
        <div className="title">{boardData.title}</div>
        <div className="titleDiv">
          <div className="titleInfo">글쓴이 : {boardData.nickname}</div>
          <div className="titleInfo">
            {new Date(boardData.createdAt).toLocaleString()} || 조회수 :{" "}
            {boardData.view}
          </div>
        </div>

        <div className="lineDiv"></div>
        <QuillViewDiv
          dangerouslySetInnerHTML={{ __html: boardData.content }}
        ></QuillViewDiv>
        <HeartItem>
          <div className="likeDiv">
            <button className="heartButton">
              <img width={45} src={heart} alt="heart"></img>
            </button>
            <div className="heartCount">{boardData.likeCount}</div>
          </div>
        </HeartItem>
        <EditDeleteDiv>
          <button
            className="edButton"
            onClick={() => {
              navigate(`${pathname}/edit`);
            }}
          >
            수정
          </button>
          <button className="edButton">삭제</button>
        </EditDeleteDiv>
        <AnswerList
          boardData={boardData}
          answerListData={answerListData}
          id={id}
        />
      </BoardInfoWrapper>
    </PageWrapper>
  );
};

export default Board;
