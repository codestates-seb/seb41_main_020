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

const ShowListInnerContainer = styled.ul`
  all: unset;
  align-items: center;
  display: flex;
  height: 450px;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  overflow-y: scroll;

  @media screen and (max-width: ${breakpoint.mobile}) {
    height: 340px;
    width: 100%;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function ShowList() {
  return (
    <ShowListInnerContainer>
      <ShowItem />
      <ShowItem />
      <ShowItem />
      <ShowItem />
    </ShowListInnerContainer>
  );
}
