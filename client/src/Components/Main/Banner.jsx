import React from "react";

import logo from "../../assets/logo.svg";
import { dtFontSize } from "../../styles/mixins";

import styled from "styled-components";

const BannerContianer = styled.div`
  width: 100vw;
  height: 350px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;

  p {
    margin: 30px;
    text-align: center;
    font-size: ${dtFontSize.large};
    color: white;
    font-weight: 400;
  }
`;

export default function Banner() {
  return (
    <BannerContianer>
      <img width="200" src={logo} alt="logo" />
      <p>
        IndieGo는 지역 공연 문화 발전의 활성화를 도모하는 <br />
        퍼포머와 소비자 간의 직접 티켓팅, 커뮤니티 서비스 입니다.
      </p>
    </BannerContianer>
  );
}
