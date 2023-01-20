import React from "react";
import styled from "styled-components";
import breakpoint from "../../../styles/breakpoint";

import { primary, mbFontSize, sub } from "../../../styles/mixins";

import { useLocation, useNavigate } from "react-router-dom";

const MobileAsideDiv = styled.div`
  z-index: 15;
  position: fixed;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 50px;
  border-bottom: 3px solid ${sub.sub200};
  background-color: white;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  display: none;

  .mobileAsideList {
    display: flex;
    flex-direction: row;
    align-items: center;

    .mobileAsideItem {
      background-color: white;
      border: solid 1px ${primary.primary500};
      border-radius: 20px;
      color: ${primary.primary500};
      font-size: ${mbFontSize.medium};
      width: 120px;
      height: 40px;
      margin: 0 10px;
      font-weight: 700;
      cursor: pointer;
    }

    .thisMobileAsideItem {
      background-color: ${primary.primary400};
      border: solid 1px white;
      border-radius: 20px;
      color: white;
      font-size: ${mbFontSize.medium};
      width: 120px;
      height: 40px;
      margin: 0 10px;
      font-weight: 700;
      cursor: pointer;
    }
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: flex;
  }
`;

const MobileAside = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <MobileAsideDiv>
      <div className="mobileAsideList">
        <button
          className={
            pathname === "/board/free"
              ? "thisMobileAsideItem"
              : "mobileAsideItem"
          }
          onClick={() => {
            navigate("/board/free");
          }}
        >
          자유 게시판
        </button>
        <button
          className={
            pathname === "/board/employ"
              ? "thisMobileAsideItem"
              : "mobileAsideItem"
          }
          onClick={() => {
            navigate("/board/employ");
          }}
        >
          구인 게시판
        </button>
        <button
          className={
            pathname === "/board/request"
              ? "thisMobileAsideItem"
              : "mobileAsideItem"
          }
          onClick={() => {
            navigate("/board/request");
          }}
        >
          요청 게시판
        </button>
        <button
          className={
            pathname === "/board/advertise"
              ? "thisMobileAsideItem"
              : "mobileAsideItem"
          }
          onClick={() => {
            navigate("/board/advertise");
          }}
        >
          홍보 게시판
        </button>
        <button
          className={
            pathname === "/board/review"
              ? "thisMobileAsideItem"
              : "mobileAsideItem"
          }
          onClick={() => {
            navigate("/board/review");
          }}
        >
          후기 게시판
        </button>
      </div>
    </MobileAsideDiv>
  );
};

export default MobileAside;
