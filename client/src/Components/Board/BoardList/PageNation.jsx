import right from "../../../assets/right.svg";
import left from "../../../assets/left.svg";

import { sub, dtFontSize, primary } from "../../../styles/mixins";

import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

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

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    list-style: none;

    li {
      margin: 3px;

      a {
        background-color: white;
        border: none;
        color: ${sub.sub900};
        font-size: ${dtFontSize.medium};
        width: 20px;
        height: 35px;
        margin-left: 5px;
        margin-right: 5px;
        padding: 0;
        text-decoration-line: none;
      }
      &.on a {
        color: ${primary.primary200};
      }
    }
  }
  /* .pageButton {
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

  .pageButtonOn {
    background-color: white;
    border: none;
    color: ${primary.primary200};
    font-size: ${dtFontSize.medium};
    width: 20px;
    height: 35px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 0;
  } */
`;

const PageNation = ({ pageData, category, location }) => {
  const PageLengthData = [...Array(pageData.totalPages)].map((it, idx) => {
    return (it = {
      nowNum: pageData.page === idx + 1 ? true : false,
      num: idx + 1,
    });
  });
  console.log(PageLengthData);
  return (
    <PageNationDiv>
      <button className="movePageButton">
        <img className="arrowLeftImage" src={left} alt="이전 버튼" />
      </button>
      <ul>
        {PageLengthData.map((it, idx) => (
          <li key={idx} className={it.nowNum ? "on" : ""}>
            <Link to={`${location}?category=${category}&page=${it.num}`}>
              {it.num}
            </Link>
          </li>
        ))}
      </ul>
      <button className="movePageButton">
        <img className="arrowRightImage" src={right} alt="다음 버튼" />
      </button>
    </PageNationDiv>
  );
};

export default PageNation;
