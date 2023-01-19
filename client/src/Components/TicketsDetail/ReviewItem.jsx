/* eslint-disable import/no-unresolved */
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
  background-color: ${sub.sub200};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  margin-bottom: 3%;
  padding: 20px 0;

  @media screen and (max-width: ${breakpoint.mobile}) {
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    padding: 15px;
  }

  > .top-container {
    align-items: center;
    display: flex;
    width: fit-content;

    @media screen and (max-width: ${breakpoint.mobile}) {
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    > .top-left-container {
      align-items: center;
      display: flex;

      > .star-rating-container {
        align-items: center;
        display: flex;
        padding-right: 10px;
        width: max-content;
      }

      > .reviewer-name {
        display: flex;
        color: ${sub.sub800};
        font-weight: 600;
        font-size: ${dtFontSize.small};
        flex-direction: row;
        padding-right: 50px;
        width: max-content;
        height: fit-content;

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.small};
          padding-right: 0;
        }
      }
    }

    > .button-container {
      display: flex;
      justify-content: space-between;
      right: 0;
      position: relative;
      width: 53px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        width: 46px;
      }

      > button {
        all: unset;
        width: max-content;
        font-size: ${dtFontSize.small};
        color: ${sub.sub400};
        cursor: pointer;

        &:hover {
          color: ${primary.primary500};
        }

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.small};
        }
      }
    }
  }

  > .review-content {
    color: ${sub.sub800};
    font-weight: 400;
    font-size: ${dtFontSize.small};

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.small};
    }
  }
`;

export default function ReviewItem() {
  return (
    <ReviewItemContainer>
      <div className="top-container">
        <div className="top-left-container">
          <div className="star-rating-container">
            <FontAwesomeIcon icon={faStar} color={misc.orange} />
            <FontAwesomeIcon icon={faStar} color={misc.orange} />
            <FontAwesomeIcon icon={faStar} color={misc.orange} />
            <FontAwesomeIcon icon={faStar} color={misc.orange} />
            <FontAwesomeIcon icon={faStar} color={sub.sub300} />
          </div>
          <div className="reviewer-name">일이삼사오육칠팔구십</div>
        </div>
        <div className="button-container">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <span className="review-content">
        오십자제한오십자제한오십자제한오십자제한오십자제한오십자제한오십자제한오십자제한오십자제한오십자제한
      </span>
    </ReviewItemContainer>
  );
}
