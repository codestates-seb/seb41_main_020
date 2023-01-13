import React from "react";

import logo from "../../assets/logo.svg";
import { dtFontSize } from "../../styles/mixins";
import testBannerImage from "../../assets/testBannerImage.jpg";

import styled from "styled-components";

const BannerContianer = styled.div`
  width: 100%;
  height: calc(width * 0.3);
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
      <img alt="test" src={testBannerImage} width="100%" />
    </BannerContianer>
  );
}
