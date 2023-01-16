//페이지, 리액트 컴포넌트, 정적 파일
import ShowItem from "./ShowItem.jsx";

//로컬 모듈
import breakpoint from "../../styles/breakpoint";
import {
  primary,
  secondary,
  sub,
  misc,
  dtFontSize,
  mbFontSize,
} from "../../styles/mixins";

//라이브러리 및 라이브러리 메소드
import React from "react";
import styled from "styled-components/macro";

const ShowListContainer = styled.ul`
  all: unset;
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: none;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
`;

export default function ShowList() {
  return (
    <ShowListContainer>
      <ShowItem />
      <ShowItem />
      <ShowItem />
      <ShowItem />
    </ShowListContainer>
  );
}
