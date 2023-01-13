import { primary, dtFontSize, sub, secondary } from "../../styles/mixins.js";
import BoardDummy from "../../DummyData/BoardDummy.js";
import heart from "../../assets/heart.svg";
import pen from "../../assets/pen.svg";
import right from "../../assets/right.svg";
import left from "../../assets/left.svg";
import OKButton from "../../Components/OKButton.jsx";
import Aside from "./Aside/Aside.jsx";
import search from "../../assets/search.svg";

import React from "react";
import styled from "styled-components";

export const PageWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  text-align: center;
  /* height: max-content; */
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vh;

  .title {
    font-size: ${dtFontSize.xlarge};
    color: ${primary.primary500};
    font-weight: 700;
    text-align: left;
  }
  .titleInfo {
    font-size: ${dtFontSize.medium};
    margin-top: 10px;
    color: ${sub.sub300};
    text-align: left;
    margin-bottom: 30px;
  }

  .lineDiv {
    height: 3px;
    background-color: ${sub.sub300};
  }
`;

export const BoardItem = styled.div`
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

    .heartImageDiv {
      margin-bottom: 5px;
      background-color: white;
      border: white;
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
    font-size: ${dtFontSize.medium};
    font-weight: 700;
    text-align: left;
    color: ${sub.sub900};
  }
  .contentDiv {
    font-size: ${dtFontSize.small};
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
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: right;

  & :hover {
    background-color: ${secondary.secondary500};
  }
`;

const WriteButton = styled(OKButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 35px;

  .pencelImage {
    margin-right: 10px;
    width: 20px;
  }

  .WriteButtonSpan {
    font-size: ${dtFontSize.medium};
    color: ${sub.sub100};
  }
`;

const PageNationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  .movePageButton {
    border-radius: 100%;
    width: 15px;
    height: 15px;
    background-color: ${sub.sub500};
    border: none;
    padding: 0;

    .arrowLeftImage {
      width: 6px;
    }

    .arrowRightImage {
      width: 6px;
      margin-left: 1px;
    }
  }

  .pageButton {
    background-color: white;
    border: none;
    color: ${sub.sub900};
    font-size: ${dtFontSize.medium};
    width: 20px;
    height: 35px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0;
  }
`;

const SearchBarDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  .aSearchBarDiv {
    background-color: blue;
    width: 40%;
  }
  .searchBarInput {
    padding: 10px;
    width: 80%;
    height: 40px;
    border: 2px solid ${sub.sub400};
    border-radius: 10px;
  }

  .searchImage {
    width: 17px;
    height: 17px;
  }

  .listButton {
    background-color: blue;
  }
`;

export default function Board() {
  return (
    <PageWrapper>
      <Aside></Aside>
      <ContentWrapper>
        <div className="title">자유게시판</div>
        <div className="titleInfo">
          자유로운 주제로 글과 의견을 공유하는 게시판입니다.
        </div>
        <div className="lineDiv"></div>
        {BoardDummy.map((it) => (
          <BoardItem key={it.id}>
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
          <WriteButton>
            <img className="pencelImage" src={pen} alt="pen"></img>
            <span className="WriteButtonSpan">글 올리기</span>
          </WriteButton>
        </WriteButtonDiv>
        <PageNationDiv>
          <button className="movePageButton">
            <img className="arrowLeftImage" src={left} alt="이전 버튼" />
          </button>
          <button className="pageButton">1</button>
          <button className="pageButton">2</button>
          <button className="pageButton">3</button>
          <button className="pageButton">4</button>
          <button className="movePageButton">
            <img className="arrowRightImage" src={right} alt="다음 버튼" />
          </button>
        </PageNationDiv>
        <SearchBarDiv>
          <div className="aSearchBarDiv">
            <input
              className="searchBarInput"
              placeholder="검색어를 입력하세요."
            />
            <img className="searchImage" src={search} alt="돋보기"></img>
          </div>
        </SearchBarDiv>
      </ContentWrapper>
    </PageWrapper>
  );
}
