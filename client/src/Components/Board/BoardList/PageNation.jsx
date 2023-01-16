import right from "../../../assets/right.svg";
import left from "../../../assets/left.svg";

import { sub, dtFontSize } from "../../../styles/mixins";

import styled from "styled-components";
import React from "react";

const PageNationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  .movePageButton {
    border-radius: 100%;
    width: 15px;
    height: 15px;
    background-color: ${sub.sub500};
    border: none;
    padding: 0;

    .arrowLeftImage {
      width: 6px;
    }

    .arrowRightImage {
      width: 6px;
      margin-left: 1px;
    }
  }

  .pageButton {
    background-color: white;
    border: none;
    color: ${sub.sub900};
    font-size: ${dtFontSize.medium};
    width: 20px;
    height: 35px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0;
  }
`;

const PageNation = () => {
  return (
    <PageNationDiv>
      <button className="movePageButton">
        <img className="arrowLeftImage" src={left} alt="이전 버튼" />
      </button>
      <button className="pageButton">1</button>
      <button className="pageButton">2</button>
      <button className="pageButton">3</button>
      <button className="pageButton">4</button>
      <button className="movePageButton">
        <img className="arrowRightImage" src={right} alt="다음 버튼" />
      </button>
    </PageNationDiv>
  );
};

export default PageNation;
