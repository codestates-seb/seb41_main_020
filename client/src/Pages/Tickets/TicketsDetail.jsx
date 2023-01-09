// 최상단에는 리액트 컴포넌트
// 그다음에는 로컬 모듈
import styled from "styled-components/macro";
import breakpoint from "../../styles/breakpoint";
import { Mixin } from "react";
import {
  primary,
  secondary,
  sub,
  misc,
  dtFontSize,
  mbFontSize,
} from "../../styles/mixins";
// 그다음에는 라이브러리
import React from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  margin: 0 auto;
  justify-content: center;
  background-color: aliceblue;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: beige;
`;

const ContentHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 47px;
`;

export default function TicketsDetail() {
  return (
    <Container>
      <ContentContainer>dfsfd</ContentContainer>
    </Container>
  );
}
