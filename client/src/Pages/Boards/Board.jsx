import React from "react";
import styled from "styled-components";
import Aside from "./Aside/Aside.jsx";
import Header from "../../Components/Header.jsx";
import { primary, dtFontSize, sub } from "../../styles/mixins.js";
import BoardDummy from "../../DummyData/BoardDummy.js";
import heart from "../../assets/heart.svg";
import pen from "../../assets/pen.svg";
import right from "../../assets/right.svg";
import left from "../../assets/left.svg";

const Wrapper = styled.div`
  width: 1200px;
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
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    padding-left: 10px;
    font-size: ${dtFontSize.xlarge};
    color: ${primary.primary500};
    font-weight: 700;
    text-align: left;
  }
  .titleInfo {
    padding-left: 10px;
    font-size: ${dtFontSize.medium};
    margin-top: 10px;
    color: ${sub.sub300};
    border-bottom: 3px solid ${sub.sub300};
    text-align: left;
    padding-bottom: 30px;
  }
`;

const BoardItem = styled.div`
  border-bottom: 3px solid ${sub.sub300};
  display: flex;
  height: 100px;

  .likeDiv {
    width: 130px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    .heartButton {
      margin-bottom: 5px;
      background-color: white;
      border: white;
      cursor: pointer;
    }

    .heartCount {
      color: ${primary.primary500};
      font-weight: 700;
    }
  }
  .imageDiv {
    display: flex;
    text-align: center;
    justify-content: center;
    width: 120px;
  }
`;

const BoardItemContent = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .titleDiv {
    margin-top: 10px;
    font-size: ${dtFontSize.large};
    font-weight: 700;
    text-align: left;
    color: ${sub.sub900};
  }
  .contentDiv {
    font-size: ${dtFontSize.medium};
    font-weight: 500;
    text-align: left;
    color: ${sub.sub700};
  }
`;

const BoardItemCreateInfo = styled.div`
  display: flex;
  flex-direction: row;
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

const WriteButtonDiv = styled.div`
  text-align: right;
  .writeButton {
    background-color: ${primary.primary300};
    border-color: ${primary.primary300};
    color: ${sub.sub100};
    border-radius: 20%;
    width: 120px;
    height: 35px;
    font-size: ${dtFontSize.small};
    margin-top: 20px;
    padding-right: 20px;
    padding-bottom: 10px;

    .pencelImage {
      width: 20px;
      margin-right: 10px;
    }
  }
`;

const PageNationDiv = styled.div`
  background-color: yellow;
  .pageButton {
    background-color: green;
    border-color: white;
    color: ${sub.sub900};
    font-size: ${dtFontSize.medium};
    width: 20px;
    height: 35px;
    margin-right: 5px;
  }
`;

const SearchBarDiv = styled.div`
  .SearchBarInput {
    width: 100px;
    height: 100px;
  }
  .ListButton {
    background-color: blue;
  }
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
                <div>
                  <button className="heartButton">
                    <img width={30} src={heart} alt="heart"></img>
                  </button>
                </div>
                <div className="heartCount">157</div>
              </div>
              <div className="imageDiv">
                <img width={50} src={heart} alt="heart"></img>
              </div>
              <BoardItemContent>
                <div className="titleDiv">{it.title}</div>
                <div className="contentDiv">{it.content}</div>
                <BoardItemCreateInfo>
                  <div className="authorDiv">{it.author}</div>
                  <div className="createDateDiv">{it.createdData}</div>
                </BoardItemCreateInfo>
              </BoardItemContent>
            </BoardItem>
          ))}
          <WriteButtonDiv>
            <button className="writeButton">
              <img className="pencelImage" src={pen} alt="pen"></img>
              글올리기
            </button>
          </WriteButtonDiv>
          <PageNationDiv>
            <img src="right" alt="이전 버튼" />
            <button className="pageButton">1</button>
            <button className="pageButton">2</button>
            <button className="pageButton">3</button>
            <button className="pageButton">4</button>
            <img width={20} src="left" alt="다음 버튼" />
          </PageNationDiv>
          <SearchBarDiv>
            <input placeholder="검색어를 입력하세요." />
          </SearchBarDiv>
        </BoardWrapper>
      </PageWrapper>
    </Wrapper>
  );
}
