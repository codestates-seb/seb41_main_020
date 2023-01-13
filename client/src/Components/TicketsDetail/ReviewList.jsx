/* eslint-disable import/no-unresolved */
//페이지, 리액트 컴포넌트, 정적 파일
import ReviewItem from "../TicketsDetail/ReviewItem.jsx";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const ReviewListContainer = styled.ul`
  all: unset;
  display: flex;
  width: 90%;
  flex-direction: column;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const AddMoreButton = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  margin-top: 3%;
  width: max-content;

  &:hover {
    color: ${primary.primary500};
  }

  > span {
    margin-right: 5px;
  }
`;

export default function ReviewList() {
  return (
    <>
      <ReviewListContainer>
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </ReviewListContainer>
      <AddMoreButton>
        <span>더보기</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </AddMoreButton>
    </>
  );
}
