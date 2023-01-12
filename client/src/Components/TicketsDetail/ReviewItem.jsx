//페이지, 리액트 컴포넌트, 정적 파일
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
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

const ReviewItemContainer = styled.li`
  align-items: center;
  border-radius: 10px;
  display: flex;
  width: 100%;
  height: 60px;
  margin-bottom: 3%;
  padding: 0 5%;

  background-color: ${sub.sub200};

  > .star-rating-container {
    display: flex;
    margin-right: 1%;
  }

  > .reviewer-name {
    color: ${sub.sub800};
    font-weight: 600;
    font-size: ${dtFontSize.small};
    margin-right: 5%;
  }

  > .review-content {
    color: ${sub.sub800};
    font-weight: 400;
    font-size: ${dtFontSize.small};
  }
`;

export default function ReviewItem() {
  return (
    <ReviewItemContainer>
      <div className="star-rating-container">
        <FontAwesomeIcon icon={faStar} color={misc.orange} />
        <FontAwesomeIcon icon={faStar} color={misc.orange} />
        <FontAwesomeIcon icon={faStar} color={misc.orange} />
        <FontAwesomeIcon icon={faStar} color={misc.orange} />
        <FontAwesomeIcon icon={faStar} color={sub.sub300} />
      </div>
      <span className="reviewer-name">김아무개 님</span>
      <span className="review-content">넘넘 재밌어요 추천합니다람쥐</span>
    </ReviewItemContainer>
  );
}
