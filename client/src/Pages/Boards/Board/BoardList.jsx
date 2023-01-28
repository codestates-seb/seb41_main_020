//페이지, 리액트 컴포넌트, 정적 파일
import pen from "../../../assets/pen.svg";
import OKButton from "../../../Components/Board/BoardList/OKButton.jsx";
import Aside from "../Aside/Aside.jsx";
import MobileAside from "../Aside/MobileAside.jsx";
import SearchBar from "../../../Components/Board/BoardList/SearchBar.jsx";
import Dropdown from "../../../Components/Board/BoardList/Dropdown.jsx";
import PageNation from "../../../Components/Board/BoardList/PageNation.jsx";
import BoardListItem from "../../../Components/Board/BoardListItem/BoardListItem";
import Spinner from "../../../Components/Spinner";

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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useBoardListStore from "../../../store/useBoardListStore";

export const PageWrapper = styled.div`
  /* background-color: black; */
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
  height: max-content;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 95%;
    margin-left: 10px;
    padding-left: 0;
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
    padding: 3px 0;

    img {
      width: 100px;
    }

    @media screen and (max-width: ${breakpoint.mobile}) {
      display: none;
    }
  }
`;

const WriteButtonDiv = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: right;

  @media screen and (max-width: ${breakpoint.mobile}) {
    justify-content: center;
    margin: 30px 0;
  }

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

export const SpinnerExtended = styled(Spinner)`
  position: absolute;
  left: 50%;
  top: 50%;

  .lds-dual-ring:after {
    border: 6px solid ${primary.primary300};
    border-color: ${primary.primary300} transparent ${primary.primary300}
      transparent;
  }
`;

export default function BoardList() {
  const navigate = useNavigate();
  const { boardList, setBoardListData } = useBoardListStore();
  const [pageData, setPageData] = useState([]);
  const [searchParams] = useSearchParams();
  const urlPage = searchParams.get("page");
  const urlCategory = searchParams.get("category");
  const urlStatus = searchParams.get("status");
  const urlSize = searchParams.get("size");

  const queryParams = [...searchParams.entries()];
  console.log(queryParams);

  const { pathname } = useLocation();

  const userId = localStorage.getItem("userInfoStorage");

  console.log(`${urlCategory} ${urlPage} ${urlStatus} ${urlSize} ${pathname}`);

  // 게시글 리스트 불러오기
  const axiosBoardList = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/articles?category=${urlCategory}&status=${urlStatus}&page=${urlPage}&size=${urlSize}`
    );
    return response.data;
  };
  const axiosBoardListOnSuccess = (response) => {
    setBoardListData(response.data);
    setPageData(response.pageInfo);
    window.scrollTo(0, 0);
  };

  const { isLoading, isError, error } = useQuery({
    queryKey: ["axiosBoardList", urlPage],
    queryFn: axiosBoardList,
    onSuccess: axiosBoardListOnSuccess,
  });

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  // 게시글 정보 불러오기(하트 개수 표시를 위함)
  // const axiosBoard = async () => {
  //   const response = await axios.get(
  //     `http://indiego.kro.kr:80/articles?category=${urlCategory}&status=${urlStatus}&page=${urlPage}&size=${urlSize}`
  //   );
  //   return response.data;
  // };
  // const axiosBoardListOnSuccess = (response) => {
  //   setBoardListData(response.data);
  //   setPageData(response.pageInfo);
  //   window.scrollTo(0, 0);
  // };

  // const { isLoading, isError, error } = useQuery({
  //   queryKey: ["axiosBoardList", urlPage],
  //   queryFn: axiosBoardList,
  //   onSuccess: axiosBoardListOnSuccess,
  // });

  const handleWriteButton = () => {
    if (userId === null) {
      alert("로그인 후 이용할 수 있습니다");
      navigate("/login");
      return;
    }
    navigate(`${pathname}/create`);
  };

  return (
    <PageWrapper>
      <Aside />
      <MobileAside />
      <BoardWrapper>
        <div className="title">{urlCategory}</div>
        <div className="titleInfo">
          자유로운 주제로 글과 의견을 공유하는 게시판입니다.
        </div>
        <div className="dropboxDiv">
          <Dropdown
            location={`${pathname}?category=${urlCategory}&size=${urlSize}&page=${urlPage}`}
          ></Dropdown>
        </div>
        <div className="lineDiv"></div>
        {isLoading ? (
          <SpinnerExtended />
        ) : (
          boardList.map((it) => <BoardListItem key={it.id} {...it} />)
        )}

        {console.log("*******************************")}
        {console.log(boardList)}
        {console.log("*******************************")}
        <WriteButtonDiv>
          <WriteButton onClick={handleWriteButton}>
            <img className="pencelImage" src={pen} alt="pen"></img>
            <span className="WriteButtonSpan">글 올리기</span>
          </WriteButton>
        </WriteButtonDiv>
        <PageNation
          location={`${pathname}?category=${urlCategory}&status=${urlStatus}&size=${urlSize}`}
          pageData={pageData}
        ></PageNation>
        <SearchBar
          placeholder="검색어를 입력해주세요"
          location={`${pathname}?category=${urlCategory}&status=${urlStatus}&page=${urlPage}&size=${urlSize}`}
          setPageData={setPageData}
        ></SearchBar>
      </BoardWrapper>
    </PageWrapper>
  );
}
