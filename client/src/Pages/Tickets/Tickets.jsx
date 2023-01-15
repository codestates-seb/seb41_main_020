import React from "react";

import SearchBar from "../../Components/Main/SearchBar.jsx";
import Button from "../../Components/Main/Button.jsx";
import ItemList from "../../Components/Ticktes/ItemList.jsx";

import breakpoint from "../../styles/breakpoint";
import { primary, sub, dtFontSize, mbFontSize } from "../../styles/mixins";
import { dummyArr } from "../../DummyData/mainDummy.js";

import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

const ContentHeaderContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: space-between;
  min-height: 100px;
  padding: 30px 47px;
  width: 90%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px 5.13%;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
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

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.xlarge};
    }
  }

  > h2 {
    all: unset;
    color: ${sub.sub400};
    font-size: ${dtFontSize.medium};
    font-weight: 400;
    margin: 5px 0 0 0;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

const SearchBarContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 50px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const SearchBarExtended = styled(SearchBar)`
  width: 60%;
  justify-content: flex-start;
  padding: 0 10px;

  .input_container {
    width: 80%;
  }

  .option_container {
    width: 20%;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: flex;
    width: 85%;
  }
`;

const ButtonExtended = styled(Button)`
  width: max-content;
  min-width: 120px;
  height: max-content;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ItemListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 50px;
`;

export default function Tickets() {
  return (
    <Container>
      <ContentHeaderContainer>
        <HeaderTitleContainer>
          <h1>공연 검색</h1>
          <h2>찾고자 하는 공연이 열리는 지역과 기간, 공연명을 입력하세요.</h2>
        </HeaderTitleContainer>
      </ContentHeaderContainer>
      <ContentContainer>
        <SearchBarContainer>
          <ButtonContainer>
            <ButtonExtended>종로구</ButtonExtended>
            <ButtonExtended>2022.12.24 ~ 2022.12.25</ButtonExtended>
          </ButtonContainer>
          <SearchBarExtended></SearchBarExtended>
        </SearchBarContainer>
        <ItemListContainer>
          <ItemList data={dummyArr} />
        </ItemListContainer>
      </ContentContainer>
    </Container>
  );
}
