//페이지, 리액트 컴포넌트, 정적 파일
import heart from "../../../assets/heart.svg";
import pen from "../../../assets/pen.svg";
import right from "../../../assets/right.svg";
import left from "../../../assets/left.svg";
import OKButton from "../../../Components/Board/BoardList/OKButton.jsx";
import Aside from "../Aside/Aside.jsx";
import MobileAside from "../Aside/MobileAside.jsx";
import SearchBar from "../../../Components/Board/BoardList/SearchBar.jsx";
import Dropdown from "../../../Components/Board/BoardList/Dropdown.jsx";

//로컬 모듈
import {
  primary,
  dtFontSize,
  sub,
  secondary,
  mbFontSize,
} from "../../../styles/mixins.js";
import breakpoint from "../../../styles/breakpoint";
import BoardDummy from "../../../DummyData/BoardDummy.js";

//라이브러리 및 라이브러리 메소드
import React from "react";
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  margin-top: 30px;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-left: 10px;
  height: 1400px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-left: 50px;
    width: 90%;
  }

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

  .dropboxDiv {
    display: flex;
    justify-content: right;
    margin-bottom: 5px;
  }

  .lineDiv {
    height: 3px;
    background-color: ${sub.sub300};
  }
`;

const BoardWrapper = styled(ContentWrapper)`
  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-top: 130px;
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

    @media screen and (max-width: ${breakpoint.mobile}) {
      width: 80px;
    }

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

    @media screen and (max-width: ${breakpoint.mobile}) {
      display: none;
    }
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

    @media screen and (max-width: ${breakpoint.mobile}) {
      margin-top: 10px;
      font-size: ${mbFontSize.xlarge};
    }
  }
  .contentDiv {
    font-size: ${dtFontSize.small};
    font-weight: 500;
    text-align: left;
    color: ${sub.sub700};

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.large};
      margin-bottom: 20px;
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
    border: 3px solid ${sub.sub500};
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding-right: 4px;

    .searchBarInput {
      border-radius: 20px;
      padding: 10px;
      height: 40px;
      border: none;

      &:focus-within {
        outline: none;
      }
    }

    .searchImage {
      width: 17px;
      height: 17px;
    }
    &:focus-within {
      border: 3px solid ${primary.primary200};
    }
  }

  .listButton {
    background-color: blue;
  }
`;

export default function ReviewBoardList() {
  return (
    <PageWrapper>
      <Aside></Aside>
      <MobileAside></MobileAside>
      <BoardWrapper>
        <div className="title">후기게시판</div>
        <div className="titleInfo">
          공연의 후기를 작성할 수 있는 게시판 입니다.
        </div>
        <div className="dropboxDiv">
          <Dropdown></Dropdown>
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
        <SearchBar placeholder="검색어를 입력해주세요"></SearchBar>
      </BoardWrapper>
    </PageWrapper>
  );
}
