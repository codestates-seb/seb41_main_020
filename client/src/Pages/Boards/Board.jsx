import React from "react";
import styled from "styled-components";
import Aside from "./Aside/Aside.jsx";
import Header from "../../Components/Header.jsx";
import { primary, dtFontSize, sub } from "../../styles/mixins.js";
import BoardDummy from "../../DummyData/BoardDummy.js";

const Wrapper = styled.div`
  background-color: pink;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div`
  margin-top: 20px;

  display: flex;
  text-align: center;
`;

const BoardWrapper = styled.div`
  background-color: green;
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    background-color: white;
    width: 300px;
    font-size: ${dtFontSize.xlarge};
    color: ${primary.primary500};
    font-weight: 700;
  }
  .titleInfo {
    background-color: white;
    font-size: ${dtFontSize.medium};
    width: 555px;
    margin-top: 10px;
    color: ${sub.sub300};
  }
`;

const BoardItem = styled.div`
  background-color: yellow;
  border-bottom: 1px solid gray;
  display: flex;
  height: 150px;

  .likeDiv {
    background-color: red;
    width: 130px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
  .imageDiv {
    background-color: blue;
    width: 130px;
  }
`;

const BoardItemContent = styled.div`
  margin-left: 30px;
  background-color: white;
`;

export default function Board() {
  return (
    <Wrapper>
      <Header></Header>
      <PageWrapper>
        <Aside></Aside>
        <BoardWrapper>
          <div className="title">자유게시판</div>
          <div className="titleInfo">
            자유로운 주제로 글과 의견을 공유하는 게시판입니다.
          </div>
          {BoardDummy.map((it) => (
            <BoardItem key={it.id}>
              <div className="likeDiv">
                <div>하트</div>
                <div>좋아요수</div>
              </div>
              <div className="imageDiv">이미지</div>
              <BoardItemContent>
                <div>{it.title}</div>
                <div>{it.content}</div>
              </BoardItemContent>
            </BoardItem>
          ))}
        </BoardWrapper>
      </PageWrapper>
    </Wrapper>
  );
}
