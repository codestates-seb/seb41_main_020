import { primary, dtFontSize, sub, secondary } from "../../../styles/mixins.js";
import { Wrapper, PageWrapper, ContentWrapper } from "../Board.jsx";
import Aside from "../Aside/Aside.jsx";
import Header from "../../../Components/Header.jsx";
import OKButton from "../../../Components/OKButton.jsx";
import Editor from "../../../Components/Editor.jsx";

import React, { useState } from "react";
import styled from "styled-components";

export const PostBoard = styled.div`
  width: 80vw;
  height: 900px;
  background-color: ${sub.sub200};
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 60px;

  .postDiv {
    font-size: ${dtFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    text-align: left;
  }
`;

const ClassificationDiv = styled.div`
  background-color: red;
  text-align: left;
  margin-bottom: 80px;
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
  height: 400px;
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
`;

const PostCreate = () => {
  const [contentValue, setContentValue] = useState("");
  return (
    <Wrapper>
      <Header></Header>
      <PageWrapper>
        <Aside></Aside>
        <ContentWrapper>
          <div className="title">글 올리기</div>
          <div className="titleInfo">
            게시판 양식을 준수하여 게시물을 업로드 해주시기 바랍니다.
          </div>
          <form>
            <PostBoard>
              <div className="postDiv">분류</div>
              <ClassificationDiv>1</ClassificationDiv>
              <div className="postDiv">제목</div>
              <TitleInputDiv>
                <input
                  className="titleInput"
                  placeholder="게시글의 제목을 작성해주세요."
                />
              </TitleInputDiv>
              <div className="postDiv">본문</div>
              <ContentInputDiv>
                <Editor
                  value={contentValue}
                  setValue={setContentValue}
                  placeholder={"내용을 입력해주세요."}
                ></Editor>
                {/* {console.log(contentValue)} */}
              </ContentInputDiv>
              <PostButton type="submit">글 올리기</PostButton>
            </PostBoard>
          </form>
        </ContentWrapper>
      </PageWrapper>
    </Wrapper>
  );
};

export default PostCreate;
