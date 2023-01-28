import { primary, dtFontSize, sub } from "../../../styles/mixins";
import breakpoint from "../../../styles/breakpoint";

import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Side = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100%;
  border-right: 2px solid ${sub.sub200};

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

const SideList = styled.div`
  margin-top: 30px;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .linkNav {
    border-bottom: 3px solid transparent;
    text-decoration-line: none;
    color: ${primary.primary500};
    padding-top: 10px;
    padding-bottom: 10px;
    display: block;
    font-weight: 600;
    font-size: ${dtFontSize.medium};
  }

  .thisLinkNav {
    display: block;
    text-decoration-line: none;
    color: ${primary.primary500};
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 3px solid ${primary.primary500};
    font-size: ${dtFontSize.medium};
    font-weight: 600;
  }
`;

const Aside = () => {
  const { pathname } = useLocation();
  return (
    <Side>
      <SideList>
        <Link
          className={pathname === "/board/free" ? "thisLinkNav" : "linkNav"}
          to="/board/free?category=자유게시판&status=최신순&page=1&size=10"
        >
          자유게시판
        </Link>
        <br />
        <Link
          className={pathname === "/board/employ" ? "thisLinkNav" : "linkNav"}
          to="/board/employ?category=구인게시판&page=1"
        >
          구인게시판
        </Link>
        <br />
        <Link
          className={pathname === "/board/request" ? "thisLinkNav" : "linkNav"}
          to="/board/request?category=요청게시판&page=1"
        >
          요청게시판
        </Link>
        <br />
        <Link
          className={
            pathname === "/board/advertise" ? "thisLinkNav" : "linkNav"
          }
          to="/board/advertise?category=홍보게시판&page=1"
        >
          홍보게시판
        </Link>
        <br />
        <Link
          className={pathname === "/board/review" ? "thisLinkNav" : "linkNav"}
          to="/board/review?category=후기게시판&page=1"
        >
          후기게시판
        </Link>
        <br />
      </SideList>
    </Side>
  );
};

export default Aside;
