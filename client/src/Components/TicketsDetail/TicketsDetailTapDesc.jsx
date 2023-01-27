//페이지, 리액트 컴포넌트, 정적 파일
import DummyPoster from "../../assets/dummyPoster.jpeg";

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
import useTicketDataStore from "../../store/useTicketDataStore";

//라이브러리 및 라이브러리 메소드
import React from "react";
import styled from "styled-components/macro";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 50px;

  > img {
    width: 100%;
  }
`;

export default function TicketsDetailTapDesc() {
  const { ticketData, setTicketData } = useTicketDataStore((state) => state);
  return (
    <>
      <ContentWrapper>{ticketData.detailImage}</ContentWrapper>
    </>
  );
}
