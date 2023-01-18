//페이지, 리액트 컴포넌트, 정적 파일
import heart from "../../../assets/heart.svg";
import { BoardItem } from "../../../Pages/Boards/Board/BoardList";

//로컬 모듈
import { dtFontSize, sub, mbFontSize } from "../../../styles/mixins";
import breakpoint from "../../../styles/breakpoint";

//라이브러리 및 라이브러리 메소드
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import useBoardListStore from "../../../store/useBoardListStore";

const BoardItemContent = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoint.mobile}) {
    justify-content: flex-start;
  }

  .titleButton {
    width: max-content;
    margin-top: 10px;
    font-size: ${dtFontSize.medium};
    font-weight: 700;
    text-align: left;
    color: ${sub.sub900};
    background-color: white;
    border: none;
    cursor: pointer;

    @media screen and (max-width: ${breakpoint.mobile}) {
      margin-top: 10px;
      font-size: ${mbFontSize.large};
    }
  }
  .contentDiv {
    font-size: ${dtFontSize.small};
    font-weight: 500;
    text-align: left;
    color: ${sub.sub700};

    @media screen and (max-width: ${breakpoint.mobile}) {
      margin-top: 10px;
      font-size: ${mbFontSize.medium};
    }
  }
`;

const BoardItemCreateInfo = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: none;
  }
  .authorDiv {
    font-size: ${dtFontSize.xsmall};
    font-weight: 300;
    color: ${sub.sub300};
  }

  .createDateDiv {
    font-size: ${dtFontSize.xsmall};
    font-weight: 300;
    margin-left: 20px;
    margin-bottom: 10px;
    color: ${sub.sub300};
  }
`;

const BoardListItem = (props) => {
  const navigate = useNavigate();
  return (
    <BoardItem key={props.id}>
      <div className="likeDiv">
        <div>
          <div className="heartImageDiv">
            <img width={30} src={heart} alt="heart"></img>
          </div>
        </div>
        <div className="heartCount">157</div>
      </div>
      <div className="imageDiv">
        <img width={50} src={heart} alt="heart"></img>
      </div>
      <BoardItemContent>
        <button
          className="titleButton"
          onClick={() => {
            navigate("/board/1");
          }}
        >
          {props.title}
        </button>
        <div className="contentDiv">{props.content}</div>
        <BoardItemCreateInfo>
          <div className="authorDiv">{props.author}</div>
          <div className="createDateDiv">{props.createdData}</div>
        </BoardItemCreateInfo>
      </BoardItemContent>
    </BoardItem>
  );
};

export default BoardListItem;
