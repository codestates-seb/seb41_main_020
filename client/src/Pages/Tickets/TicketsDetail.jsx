// 최상단에는 리액트 컴포넌트
import Header from "../../Components/Header.jsx";

// 그다음에는 로컬 모듈
import styled from "styled-components/macro";
import breakpoint from "../../styles/breakpoint";
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
  background-color: aliceblue;
  display: flex;
  height: max-content;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const ContentHeaderContainer = styled.div`
  align-items: flex-start;
  display: flex;
  height: max-content;
  min-height: 150px;
  padding: 20px 47px;
  width: 100%;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    all: unset;
    color: ${primary.primary500};
    font-size: ${dtFontSize.xxlarge};
    font-weight: 700;
  }

  > h2 {
    all: unset;
    color: ${sub.sub400};
    font-size: ${dtFontSize.medium};
    font-weight: 400;
    margin: 5px 0 0 0;
  }
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 205px;
  height: max-content;
  margin: 0 0 0 20px;
`;

const PillButton = styled.button`
  all: unset;
  color: white;
  cursor: pointer;
  width: max-content;
  height: max-content;
  padding: 5px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: ${dtFontSize.medium};
  background-color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default function TicketsDetail() {
  return (
    <>
      <Header />
      <Container>
        <ContentContainer>
          <ContentHeaderContainer>
            <HeaderTitleContainer>
              <h1>공연 상세페이지</h1>
              <h2>서울 / 종로구 / Rock Night Party</h2>
            </HeaderTitleContainer>
            <HeaderButtonContainer>
              <PillButton
                color={primary.primary300}
                hoverColor={secondary.secondary500}
              >
                수정하기
              </PillButton>
              <PillButton color={misc.red} hoverColor={misc.lightred}>
                삭제하기
              </PillButton>
            </HeaderButtonContainer>
          </ContentHeaderContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
