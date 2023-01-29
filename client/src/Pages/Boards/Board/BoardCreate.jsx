import { primary, sub, secondary, mbFontSize } from "../../../styles/mixins.js";
import { PageWrapper, ContentWrapper } from "./BoardList.jsx";
import breakpoint from "../../../styles/breakpoint.js";
import Aside from "../Aside/Aside.jsx";
import OKButton from "../../../Components/Board/BoardList/OKButton.jsx";
import Editor from "../../../Components/Board/BoardCreate/Editor.jsx";
import AnswerList from "../../../Components/Board/Answer/AnswerList";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CreateDropdown from "../../../Components/Board/BoardCreate/CreateDropdown.jsx";
import instance from "../../../api/core/default.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const PostWrapper = styled(ContentWrapper)`
  width: 70vw;
  padding-right: 10px;
  height: max-content;
  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-top: 30px;
    width: 99%;
  }
`;

export const PostBoard = styled.div`
  width: 100%;
  height: 1000px;
  background-color: ${sub.sub200};
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 60px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }

  .postDiv {
    font-size: ${mbFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    text-align: left;
  }
`;

const ClassificationDiv = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const TitleInputDiv = styled.div`
  padding-top: 10px;
  text-align: left;
  margin-bottom: 50px;

  .titleInput {
    width: 100%;
    height: 35px;
    border: 1px solid ${sub.sub400};
    border-radius: 20px;
    padding-left: 10px;
  }
`;

export const ContentInputDiv = styled.div`
  margin-top: 10px;
  text-align: left;
  padding-bottom: 50px;
  height: 500px;
  background-color: white;
  margin-bottom: 60px;

  .contentInput {
    width: 100%;
    height: 40vh;
    resize: none;
    padding-top: 5px;
    padding-left: 10px;
  }
`;

const PostButton = styled(OKButton)`
  width: 300px;
  height: 50px;

  &:hover {
    background-color: ${secondary.secondary500};
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 200px;
    font-size: ${mbFontSize.medium};
  }
`;

const BoardCreate = () => {
  const [contentValue, setContentValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const navigate = useNavigate();
  const arrayRef = useRef([""]);
  const titleRef = useRef();
  const { pathname } = useLocation();

  // 기존 경로에서 /create를 빼는 작업
  const newPathName = pathname.split("/");
  const PathNameURI = `${newPathName[1]}/${newPathName[2]}`;

  const handlePost = () => {
    if (categoryValue === "") {
      window.scrollTo(0, 0);
      return;
    }
    if (titleValue.length < 1) {
      titleRef.current.focus();
      return;
    }

    if (contentValue.length < 1) {
      window.scrollTo(0, 300);
      return;
    }

    createBoard();
  };

  const data = {
    title: titleValue,
    content: contentValue,
    image:
      arrayRef.current.length === 1 ? arrayRef.current[0] : arrayRef.current[1],
    category: categoryValue,
  };

  const handleButton = async () => {
    const response = await instance({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URI}/articles`,
      data,
    });
    return response.data.data;
  };

  const handleButtonOnSuccess = () => {
    navigate(
      `/${PathNameURI}?category=${categoryValue}&status=최신순&page=1&size=10`
    );
  };

  const handleButtonOnError = () => {
    alert("로그인 후 이용하세요");
    navigate("/login");
  };

  const { mutate: createBoard } = useMutation({
    mutationKey: ["handleButton"],
    mutationFn: handleButton,
    onSuccess: handleButtonOnSuccess,
    onError: handleButtonOnError,
  });
  return (
    <PageWrapper>
      <Aside></Aside>
      <PostWrapper>
        <div className="title">글 올리기</div>
        <div className="titleInfo">
          게시판 양식을 준수하여 게시물을 업로드 해주시기 바랍니다.
        </div>
        <PostBoard>
          <div className="postDiv">분류</div>
          <ClassificationDiv>
            <CreateDropdown
              setCategoryValue={setCategoryValue}
            ></CreateDropdown>
          </ClassificationDiv>
          <div className="postDiv">제목</div>
          <TitleInputDiv>
            <input
              ref={titleRef}
              className="titleInput"
              placeholder="게시글의 제목을 작성해주세요."
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
              }}
            />
          </TitleInputDiv>
          <div className="postDiv">본문</div>
          <ContentInputDiv>
            <Editor
              value={contentValue}
              setValue={setContentValue}
              placeholder={"내용을 입력해주세요."}
              arrayRef={arrayRef.current}
            ></Editor>
          </ContentInputDiv>
          <PostButton type="button" onClick={handlePost}>
            글 올리기
          </PostButton>
        </PostBoard>
      </PostWrapper>
    </PageWrapper>
  );
};

export default BoardCreate;
