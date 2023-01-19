//페이지, 리액트 컴포넌트, 정적 파일
import ShowList from "./ShowList.jsx";
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

const ContentInnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 5%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 20px 5.13%;
  }

  > .reservation-list-title {
    align-items: center;
    display: flex;
    color: ${primary.primary500};
    display: flex;
    font-size: ${dtFontSize.xlarge};
    font-weight: 600;
    height: 24px;
    width: 80%;
    margin-bottom: 20px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      width: 100%;
    }
  }

  > .expired-list-title {
    align-items: center;
    display: flex;
    color: ${primary.primary500};
    display: flex;
    font-size: ${dtFontSize.xlarge};
    font-weight: 600;
    height: 24px;
    width: 80%;
    margin: 50px 0 20px 0;

    @media screen and (max-width: ${breakpoint.mobile}) {
      width: 100%;
    }
  }
`;

const ShowListContainer = styled.div`
  align-items: center;
  display: flex;
  height: max-content;
  min-height: 250px;
  width: 80%;
  background-color: ${sub.sub100};
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: column;
  padding: 4%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

export default function AllShowList() {
  return (
    <ContentInnerContainer>
      <div className="reservation-list-title">나의 예약 목록</div>
      <ShowListContainer>
        <ShowList />
      </ShowListContainer>
      <div className="expired-list-title">지난 예약 목록</div>
      <ShowListContainer>
        <ShowList />
      </ShowListContainer>
    </ContentInnerContainer>
  );
}
