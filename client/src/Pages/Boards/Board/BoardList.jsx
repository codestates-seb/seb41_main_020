//페이지, 리액트 컴포넌트, 정적 파일
import heart from "../../../assets/heart.svg";
import pen from "../../../assets/pen.svg";
import OKButton from "../../../Components/Board/BoardList/OKButton.jsx";
import Aside from "../Aside/Aside.jsx";
import MobileAside from "../Aside/MobileAside.jsx";
import SearchBar from "../../../Components/Board/BoardList/SearchBar.jsx";
import Dropdown from "../../../Components/Board/BoardList/Dropdown.jsx";
import PageNation from "../../../Components/Board/BoardList/PageNation.jsx";

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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import boardListStore from "../../../store/boardListStore";

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

export default function BoardList() {
  const navigate = useNavigate();
  // const { boardList, getBoardListData } = boardListStore();

  // const axiosBoardList = async () => {
  //   const response = await axios.get(
  //     `http://ec2-13-125-98-211.ap-northeast-2.compute.amazonaws.com/articles`,
  //     { withCredentials: true }
  //   );
  //   return response.data.data;
  // };

  // const { isLoading, isError, data, error } = useQuery(
  //   ["axiosBoardList"],
  //   axiosBoardList
  // );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error : {error.message}</div>;
  // }

  // console.log(data);
  // getBoardListData(data); // zustand로 가져감

  return (
    <PageWrapper>
      <Aside></Aside>
      <MobileAside></MobileAside>
      <BoardWrapper>
        <div className="title">자유게시판</div>
        <div className="titleInfo">
          자유로운 주제로 글과 의견을 공유하는 게시판입니다.
        </div>
        <div className="dropboxDiv">
          <Dropdown></Dropdown>
        </div>
        <div className="lineDiv"></div>
        {/* boardList 가져오기 */}
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
              <button
                className="titleButton"
                onClick={() => {
                  navigate("/board/1");
                }}
              >
                {it.title}
              </button>
              <div className="contentDiv">{it.content}</div>
              <BoardItemCreateInfo>
                <div className="authorDiv">{it.author}</div>
                <div className="createDateDiv">{it.createdData}</div>
              </BoardItemCreateInfo>
            </BoardItemContent>
          </BoardItem>
        ))}
        <WriteButtonDiv>
          <WriteButton
            onClick={() => {
              navigate("/board/create");
            }}
          >
            <img className="pencelImage" src={pen} alt="pen"></img>
            <span className="WriteButtonSpan">글 올리기</span>
          </WriteButton>
        </WriteButtonDiv>
        <PageNation></PageNation>
        <SearchBar placeholder="검색어를 입력해주세요"></SearchBar>
      </BoardWrapper>
    </PageWrapper>
  );
}
