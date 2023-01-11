import { primary, dtFontSize, sub, secondary } from "../../../styles/mixins.js";
import { Wrapper, PageWrapper, ContentWrapper, BoardItem } from "../Board.jsx";
import Aside from "../Aside/Aside.jsx";
import Header from "../../../Components/Header.jsx";
import OKButton from "../../../Components/OKButton.jsx";
import EditorView from "../../../Components/EditorView.jsx";
import heart from "../../../assets/heart.svg";

import React from "react";
import styled from "styled-components";

const HeartItem = styled(BoardItem)`
  justify-content: center;
  .heartButton {
    margin-bottom: 5px;
    background-color: yellow;
    border: white;
    cursor: pointer;
  }

  .heartCount {
    color: ${primary.primary500};
    font-size: ${dtFontSize.xlarge};
    font-weight: 700;
  }
`;

const AnswerWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  /* background-color: yellow; */
  text-align: left;

  .answerCount {
    font-size: ${dtFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    margin-bottom: 30px;
  }
  .answerInputDiv {
    height: 65px;
    background-color: green;

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
`;

const AnswerCreateButton = styled(OKButton)`
  width: 100px;
  height: 40px;
`;

const Post = () => {
  return (
    <Wrapper>
      <Header></Header>
      <PageWrapper>
        <Aside></Aside>
        <ContentWrapper>
          <div className="title">글 제목(ex 난 누구인가 여긴 어디인가)</div>
          <div className="titleInfo">작성날짜,작성자</div>
          <div className="lineDiv"></div>
          <EditorView value={"서버에서 받은 데이터"}></EditorView>
          <HeartItem>
            <div className="likeDiv">
              <button className="heartButton">
                <img width={50} src={heart} alt="heart"></img>
              </button>
              <div className="heartCount">157</div>
            </div>
          </HeartItem>
          <form>
            <AnswerWrapper>
              <div className="answerCount">156개의 댓글</div>
              <div className="answerInputDiv">
                <input
                  className="answerInput"
                  type="text"
                  placeholder="댓글을 입력하세요."
                />
              </div>
              <AnswerCreateButtonDiv>
                <AnswerCreateButton type="submit">작성하기</AnswerCreateButton>
              </AnswerCreateButtonDiv>
            </AnswerWrapper>
          </form>
        </ContentWrapper>
      </PageWrapper>
    </Wrapper>
  );
};

export default Post;
