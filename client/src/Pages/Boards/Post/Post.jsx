import { primary, dtFontSize, sub, secondary } from "../../../styles/mixins.js";
import { PageWrapper, ContentWrapper, BoardItem } from "../Board.jsx";
import Aside from "../Aside/Aside.jsx";
import OKButton from "../../../Components/OKButton.jsx";
import EditorView from "../../../Components/EditorView.jsx";
import heart from "../../../assets/heart.svg";
import AnswerDummy from "../../../DummyData/AnswerDummy.js";

import React from "react";
import styled from "styled-components";

const HeartItem = styled(BoardItem)`
  justify-content: center;
  .heartButton {
    margin-bottom: 5px;
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
  text-align: left;

  .answerCount {
    font-size: ${dtFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    margin-bottom: 30px;
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

const AnswerListUserDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-bottom: 15px;
`;

const AnswerListImageDiv = styled.div`
  .userImage {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

const AnswerListInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .answerListUserName {
    background-color: white;
    height: 20px;
    text-align: left;
    color: ${primary.primary400};
    font-size: ${dtFontSize.medium};
    font-weight: 500;
    padding-left: 15px;
  }
  .answerListCreateDate {
    background-color: white;
    height: 20px;
    text-align: left;
    color: ${sub.sub300};
    font-size: ${dtFontSize.small};
    font-weight: 300;
    padding-left: 15px;
  }
`;

const AnswerListContentDiv = styled.div`
  text-align: left;
  background-color: white;
  border-bottom: 2px solid ${sub.sub300};
  padding-bottom: 5px;
  font-size: ${dtFontSize.medium};
  color: ${sub.sub800};
`;

const AnswerListFunctionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 20px;

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

    .hearCount {
      margin-left: 5px;
      margin-top: 1px;
      color: ${primary.primary400};
      font-size: ${dtFontSize.small};
    }
  }

  .udDiv {
    .udButton {
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

const Post = () => {
  return (
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
        <AnswerListWrapper>
          {AnswerDummy.map((it) => (
            <ul key={it.id}>
              <li>
                <AnswerListUserDiv>
                  <AnswerListImageDiv>
                    <img className="userImage" src={it.image} alt="userImage" />
                  </AnswerListImageDiv>
                  <AnswerListInfoDiv>
                    <div className="answerListUserName">{it.nickname}</div>
                    <div className="answerListCreateDate">
                      {new Date(it.createAt).toLocaleString()}
                    </div>
                  </AnswerListInfoDiv>
                </AnswerListUserDiv>
                <AnswerListContentDiv>{it.comment}</AnswerListContentDiv>
                <AnswerListFunctionDiv>
                  <div className="heartDiv">
                    <button className="heartButton">
                      <img className="heartImage" src={heart} alt="하트" />
                    </button>

                    <span className="hearCount">{it.likeCunt}</span>
                  </div>
                  <div className="udDiv">
                    <button className="udButton">수정</button>
                    <button className="udButton">삭제</button>
                  </div>
                </AnswerListFunctionDiv>
              </li>
            </ul>
          ))}
        </AnswerListWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Post;
