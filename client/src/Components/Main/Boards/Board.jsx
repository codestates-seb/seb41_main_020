/* eslint-disable react/prop-types */
import React from "react";

import { primary, sub, dtFontSize } from "../../../styles/mixins";

import styled from "styled-components";

const BoardContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${sub.sub100};
  display: flex;
  border: ${(props) => (props.isLast ? "none" : `1px solid ${sub.sub300}`)};
  border-width: 0 0 1px 0;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;

  path {
    fill: ${primary.primary300};
  }

  p {
    color: ${primary.primary500};
    font-size: ${dtFontSize.xsmall};
    font-weight: 500;
    margin-top: 5px;
  }
`;

const ImageContainer = styled.div`
  padding: 10px;
  margin-right: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PostDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  justify-content: space-between;

  .title {
    font-size: ${dtFontSize.small};
    font-weight: 600;
  }

  .content {
    font-size: ${dtFontSize.xsmall};
  }

  .info {
    font-size: ${dtFontSize.xsmall};
  }
`;

export default function Board({ data, isLast }) {
  return (
    <BoardContainer isLast={isLast}>
      <VoteContainer>
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
        <p>{data.likeCount}</p>
      </VoteContainer>
      <ImageContainer>
        <img src={data.image} alt="preview" />
      </ImageContainer>
      <PostDetailContainer>
        <p className="title">{data.title}</p>
        <p className="content">{data.content}</p>
        <p className="info">{data.createdAt}</p>
      </PostDetailContainer>
    </BoardContainer>
  );
}
