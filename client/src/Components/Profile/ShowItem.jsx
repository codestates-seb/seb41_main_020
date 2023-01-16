//페이지, 리액트 컴포넌트, 정적 파일
import { PillButton } from "../../Pages/Tickets/TicketsDetail.jsx";
import NaverMapIcon from "../../assets/naverMapIcon.jpg";
import KakaoMapIcon from "../../assets/kakaoMapIcon.jpg";

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

const ShowItemContainer = styled.li`
  all: unset;
  align-items: center;
  border: 3px solid blue;
  box-sizing: border-box;
  display: flex;
  height: 150px;
  width: 100%;
  background-color: ${sub.sub300};
  border-radius: 10px;
  justify-content: space-between;
  padding: 2%;
  margin-bottom: 30px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const ItemContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  > div {
    display: flex;

    > .poster-image-area {
      background-color: ${primary.primary300};
      height: 120px;
      width: 90px;
    }

    > .show-info-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 10px;

      > .title-and-provider-container {
        display: flex;
        flex-direction: column;

        > span {
          color: ${sub.sub800};
          font-weight: 600;
          font-size: ${dtFontSize.medium};
        }
      }

      > .period-and-location-container {
        display: flex;
        flex-direction: column;

        > span {
          color: ${sub.sub400};
          font-weight: 400;
          font-size: ${dtFontSize.small};
        }
      }
    }
  }

  > .button-container {
    display: flex;

    > .map-button {
      all: unset;
      cursor: pointer;
      display: inline;
      width: 30px;
      height: 30px;
      margin-right: 10px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        width: 20px;
        height: 20px;
      }

      > img {
        border-radius: 12px;
        width: 30px;
        height: 30px;

        @media screen and (max-width: ${breakpoint.mobile}) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export default function ShowItem() {
  return (
    <ShowItemContainer>
      <ItemContentContainer>
        <div>
          <div className="poster-image-area" />
          <div className="show-info-container">
            <div className="title-and-provider-container">
              <span>Rock Night Party</span>
              <span>우리 동네 락밴드</span>
            </div>
            <div className="period-and-location-container">
              <span>2023.01.16 ~ 2023.01.30</span>
              <span>서울특별시 종로구 종로운동장</span>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="map-button">
            <img alt="naver map icon" src={NaverMapIcon} />
          </button>
          <button className="map-button">
            <img alt="kakao map icon" src={KakaoMapIcon} />
          </button>
          <PillButton color={misc.red} hoverColor={misc.lightred}>
            취소하기
          </PillButton>
        </div>
      </ItemContentContainer>
    </ShowItemContainer>
  );
}
