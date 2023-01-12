//페이지, 리액트 컴포넌트, 정적 파일
import ReviewList from "./ReviewList.jsx";
import StarRating from "./StarRating.jsx";
import { PillButton } from "../../Pages/Tickets/TicketsDetail.jsx";

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

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .sub-title {
    color: ${primary.primary500};
    font-size: ${dtFontSize.xlarge};
    font-weight: 600;
    text-align: left;
    width: 100%;
  }

  > .sub-description {
    border-bottom: 1px solid ${sub.sub200};
    display: flex;
    color: ${sub.sub400};
    font-weight: 400;
    padding-bottom: 5%;
    margin-top: 5px;
    margin-bottom: 5%;
    width: 100%;
  }
`;

const ReviewWritingContainer = styled.div`
  align-items: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${sub.sub200};
  width: 100%;
  height: 200px;
  justify-content: space-between;
  margin-bottom: 5%;
  padding: 4%;

  > div {
    align-items: center;
    display: flex;
    width: 90%;

    > input {
      border: 2px solid ${sub.sub300};
      border-radius: 10px;
      width: 100%;
      height: 50px;
      margin-left: 5%;
      padding: 10px;
    }
  }
`;

export default function TicketsDetailTapReview() {
  return (
    <ContentContainer>
      <div className="sub-title">한 줄 평 남기기</div>
      <div className="sub-description">
        공연에 대한 한 줄 평을 별점과 함께 남겨주세요.
      </div>
      <ReviewWritingContainer>
        <div>
          <StarRating />
          <input
            maxLength="50"
            placeholder="한 줄 평은 50자 이내로 제한됩니다."
          />
        </div>
        <PillButton
          color={primary.primary300}
          hoverColor={secondary.secondary500}
        >
          작성하기
        </PillButton>
      </ReviewWritingContainer>
      <div className="sub-title">공연 한 줄 평</div>
      <div className="sub-description">
        공연에 다녀오신 분들이 남겨주신 소중한 공연에 대한 한 줄 평입니다.
      </div>
      <ReviewList />
    </ContentContainer>
  );
}
