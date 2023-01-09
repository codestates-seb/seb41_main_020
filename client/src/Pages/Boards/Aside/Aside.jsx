import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { primary, dtFontSize } from "../../../styles/mixins";

const Side = styled.aside`
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 100vh;
`;

const SideList = styled.div`
  background-color: white;
  margin-top: 30px;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .linkNav {
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
  console.log(pathname);
  return (
    <Side>
      <SideList>
        <Link
          className={pathname === "/board" ? "thisLinkNav" : "linkNav"}
          to="/board"
        >
          자유게시판
        </Link>
        <Link
          className={pathname === "/board/employ" ? "thisLinkNav" : "linkNav"}
          to="/board/employ"
        >
          구인게시판
        </Link>
        <Link
          className={pathname === "/board/request" ? "thisLinkNav" : "linkNav"}
          to="/board/request"
        >
          요청게시판
        </Link>
        <Link
          className={
            pathname === "/board/advertise" ? "thisLinkNav" : "linkNav"
          }
          to="/board/advertise"
        >
          홍보게시판
        </Link>
      </SideList>
    </Side>
  );
};

export default Aside;
