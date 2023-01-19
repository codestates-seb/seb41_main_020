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
  box-sizing: border-box;
  display: flex;
  min-height: 130px;
  width: 100%;
  background-color: ${sub.sub300};
  border-radius: 10px;
  justify-content: space-between;
  padding: 2% 3%;
  margin-bottom: 30px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-bottom: 20px;
    min-height: 100px;
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
      height: 100px;
      width: 75px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        height: 70px;
        width: 52.5px;
      }
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

          @media screen and (max-width: ${breakpoint.mobile}) {
            font-size: ${mbFontSize.medium};
          }
        }
      }

      > .period-and-location-container {
        display: flex;
        flex-direction: column;

        > .period {
          color: ${secondary.secondary800};
          font-weight: 600;
          font-size: ${dtFontSize.small};

          @media screen and (max-width: ${breakpoint.mobile}) {
            font-size: ${mbFontSize.small};
          }
        }

        > .location {
          color: ${sub.sub400};
          font-weight: 400;
          font-size: ${dtFontSize.small};

          @media screen and (max-width: ${breakpoint.mobile}) {
            display: none;
          }
        }
      }
    }
  }

  > .button-container {
    align-items: flex-end;
    display: flex;

    @media screen and (max-width: ${breakpoint.mobile}) {
      flex-direction: column;
    }

    > .map-button {
      all: unset;
      cursor: pointer;
      display: inline;
      width: 30px;
      height: 30px;
      margin-right: 10px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        width: 27px;
        height: 27px;
        margin-bottom: 5px;
        margin-right: 0;
      }

      > img {
        border-radius: 100%;
        width: 30px;
        height: 30px;

        @media screen and (max-width: ${breakpoint.mobile}) {
          width: 27px;
          height: 27px;
        }
      }
    }
  }

  > .empty-seat-and-profit-container {
    border-left: 1px solid ${sub.sub400};
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    padding: 2%;
    width: 40%;

    @media screen and (max-width: ${breakpoint.mobile}) {
      width: 33%;
      height: 70px;
    }

    > span {
      color: ${sub.sub800};
      font-weight: 600;
      font-size: ${dtFontSize.medium};

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.small};
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
              <span className="period">공연기간: 2023.01.16~2023.01.30</span>
              <span className="location">서울특별시 종로구 종로운동장</span>
            </div>
          </div>
        </div>
        <div className="empty-seat-and-profit-container">
          <span className="empty-seat">잔여 좌석: 35 / 70</span>
          <span className="profit">현재 수익: 123,456 원</span>
        </div>
      </ItemContentContainer>
    </ShowItemContainer>
  );
}
