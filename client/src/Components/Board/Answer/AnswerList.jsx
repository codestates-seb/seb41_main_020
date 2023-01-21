import styled from "styled-components";
import {
  primary,
  dtFontSize,
  secondary,
  mbFontSize,
} from "../../../styles/mixins.js";
import breakpoint from "../../../styles/breakpoint.js";
import OKButton from "../BoardList/OKButton.jsx";
import AnswerItem from "./AnswerItem.jsx";

import AnswerDummy from "../../../DummyData/AnswerDummy.js";
import React, { useEffect, useState } from "react";
import useAnswerListStore from "../../../store/useAnswerListStore.js";
import axios from "axios";

const AnswerWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  text-align: left;

  .answerCount {
    font-size: ${dtFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    margin-bottom: 30px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.large};
    }
  }
  .answerInputDiv {
    height: 65px;

    .answerInput {
      border: 2px solid ${primary.primary500};
      border-radius: 20px;
      width: 100%;
      height: 50px;
      padding-left: 12px;
    }
  }
`;
const AnswerCreateButtonDiv = styled.div`
  text-align: right;
  width: 100%;
  margin-bottom: 50px;
`;

const AnswerCreateButton = styled(OKButton)`
  width: 100px;
  height: 40px;

  &:hover {
    background-color: ${secondary.secondary500};
  }
`;

const AnswerListWrapper = styled.div`
  width: 100%;
  > ul {
    padding-left: 0px;
    list-style: none;

    > li {
    }
  }
`;

const AnswerList = ({ boardData, answerListData, id }) => {
  const [answerData, setAnswerData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://indiego.kro.kr:80/articles/${id}/comments`, {
        comment: answerData,
      })
      .then((res) => console.log(res));
  };
  return (
    <AnswerWrapper>
      <div className="answerCount">
        {boardData.articleCommentCount}개의 댓글
      </div>
      <form onSubmit={handleSubmit}>
        <div className="answerInputDiv">
          <input
            className="answerInput"
            type="text"
            placeholder="댓글을 입력하세요."
            value={answerData}
            onChange={(e) => {
              setAnswerData(e.target.value);
            }}
          />
        </div>
        <AnswerCreateButtonDiv>
          <AnswerCreateButton type="submit">작성하기</AnswerCreateButton>
        </AnswerCreateButtonDiv>
      </form>
      <AnswerListWrapper>
        <ul>
          {answerListData.map((it) => (
            <li key={it.id}>
              <AnswerItem {...it} />
            </li>
          ))}
        </ul>
      </AnswerListWrapper>
    </AnswerWrapper>
  );
};

export default AnswerList;
