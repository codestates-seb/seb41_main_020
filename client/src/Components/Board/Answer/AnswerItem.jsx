import styled from "styled-components";
import {
  primary,
  dtFontSize,
  sub,
  mbFontSize,
} from "../../../styles/mixins.js";
import breakpoint from "../../../styles/breakpoint.js";
import heart from "../../../assets/heart.svg";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import instance from "../../../api/core/default.js";

const AnswerListUserDiv = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 35px;
  border-bottom: 1px solid ${sub.sub200};
`;

const AnswerListImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  .userImage {
    width: 70px;
    border-radius: 50%;
  }
`;

const AnswerListInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 15px;

  .answerListUserName {
    background-color: white;
    height: 20px;
    text-align: left;
    color: ${primary.primary400};
    font-size: ${dtFontSize.medium};
    font-weight: 500;
    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
  .answerListCreateDate {
    background-color: white;
    height: 20px;
    text-align: left;
    color: ${sub.sub300};
    font-size: ${dtFontSize.small};
    font-weight: 300;
    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.small};
    }
  }
`;

const AnswerListContentDiv = styled.div`
  height: 30px;
  text-align: left;
  background-color: white;
  padding-bottom: 5px;
  font-size: ${dtFontSize.medium};
  color: ${sub.sub800};

  .editAnswerInput {
    font-size: ${dtFontSize.medium};
    width: 100%;
    padding: 2px;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.medium};
  }
`;

const AnswerListFunctionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 10px;

  .heartDiv {
    display: flex;
    justify-content: center;

    .heartButton {
      width: 20px;
      height: 20px;
      background-color: white;
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      .heartImage {
        width: 20px;
        height: 20px;
      }
    }

    .heartCount {
      margin-left: 5px;
      margin-top: 1px;
      color: ${primary.primary400};
      font-size: ${dtFontSize.small};
    }
  }

  .edDiv {
    .edButton {
      cursor: pointer;
      width: 40px;
      height: 20px;
      border: none;
      background-color: white;
      color: ${sub.sub400};
      margin-right: 5px;
    }
  }
`;

const AnswerItem = (props) => {
  const [toggle, setToggle] = useState(false);
  const [editValue, setEditValue] = useState(props.comment);

  const handleEdit = () => {
    setToggle(!toggle);
  };

  // 수정 코드
  const handleComplete = async () => {
    const data = { comment: editValue };
    const response = await instance({
      method: "patch",
      url: `http://indiego.kro.kr:80/articles/${props.articleId}/comments/${props.id}`,
      data,
    });
    console.log(response.data.data);
    return response.data.comment;
  };

  const handleCompleteOnSuccess = () => {
    setToggle(!toggle);
    props.refetch();
  };

  const { mutate: editAnswer } = useMutation({
    mutationKey: ["handleComplete"],
    mutationFn: handleComplete,
    onSuccess: handleCompleteOnSuccess,
    // onError: postButtonOnError,
  });

  // 삭제 코드
  const handleDelete = async () => {
    console.log(props.articleId);
    console.log(props.id);
    const response = await instance({
      method: "delete",
      url: `http://indiego.kro.kr:80/articles/${props.articleId}/comments/${props.id}`,
    });
    console.log(response);
    // return response.data.comment;
  };

  const handleDeleteOnSuccess = () => {
    props.refetch();
  };

  const { mutate: deleteAnswer } = useMutation({
    mutationKey: ["handleDelete"],
    mutationFn: handleDelete,
    onSuccess: handleDeleteOnSuccess,
    // onError: postButtonOnError,
  });

  return (
    <AnswerListUserDiv>
      <AnswerListImageDiv>
        <img className="userImage" src={props.image} alt="userImage" />
      </AnswerListImageDiv>
      <AnswerListInfoDiv>
        <div className="answerListUserName">{props.nickname}</div>
        <div className="answerListCreateDate">
          {new Date(props.createdAt).toLocaleString()}
        </div>
        <AnswerListContentDiv>
          {toggle ? (
            <input
              className="editAnswerInput"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            ></input>
          ) : (
            props.comment
          )}
        </AnswerListContentDiv>
        <AnswerListFunctionDiv>
          <div className="heartDiv">
            <button className="heartButton">
              <img className="heartImage" src={heart} alt="하트" />
            </button>
            <span className="heartCount">{props.likeCount}</span>
          </div>

          {toggle ? (
            <div className="edDiv">
              <button
                type="button"
                className="edButton"
                onClick={() => editAnswer()}
              >
                완료
              </button>
              <button type="button" className="edButton" onClick={handleEdit}>
                취소
              </button>
            </div>
          ) : (
            <div className="edDiv">
              <button type="button" className="edButton" onClick={handleEdit}>
                수정
              </button>
              <button
                type="button"
                className="edButton"
                onClick={() => deleteAnswer()}
              >
                삭제
              </button>
            </div>
          )}
        </AnswerListFunctionDiv>
      </AnswerListInfoDiv>
    </AnswerListUserDiv>
  );
};

export default AnswerItem;
