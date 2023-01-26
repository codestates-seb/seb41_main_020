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
import instance from "../../../api/core/default.js";
import { useMutation } from "@tanstack/react-query";

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
  border: 2px solid ${primary.primary500};
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  height: 800px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  > ul {
    padding-left: 0px;
    list-style: none;

    > li {
    }
  }
`;

const AnswerList = ({ boardData, answerListData, refetch, id }) => {
  const [answerData, setAnswerData] = useState("");
  const handleButton = async () => {
    const data = { comment: answerData };
    return await instance({
      method: "post",
      url: `http://indiego.kro.kr:80/articles/${id}/comments`,
      data,
    });
  };

  const handleButtonOnSuccess = () => {
    refetch();
  };

  const { mutate: createAnswer, isLoading } = useMutation({
    mutationKey: ["handleButton"],
    mutationFn: handleButton,
    onSuccess: handleButtonOnSuccess,
    // onError: postButtonOnError,
  });

  if (isLoading) {
    <div>Loading....</div>;
  }
  return (
    <AnswerWrapper>
      <div className="answerCount">
        {boardData.articleCommentCount}개의 댓글
      </div>
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
        <AnswerCreateButton type="button" onClick={() => createAnswer()}>
          작성하기
        </AnswerCreateButton>
      </AnswerCreateButtonDiv>
      <AnswerListWrapper>
        <ul>
          {answerListData.map((it) => (
            <li key={it.id}>
              <AnswerItem {...it} refetch={refetch} />
            </li>
          ))}
        </ul>
      </AnswerListWrapper>
    </AnswerWrapper>
  );
};

export default AnswerList;
