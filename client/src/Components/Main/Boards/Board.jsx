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
  padding: 20px 30px;
  path {
    fill: ${primary.primary300};
  }

  p {
    color: ${primary.primary500};
    font-size: ${dtFontSize.medium};
    font-weight: 500;
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
  padding: 10px 0;
  justify-content: space-between;

  .title {
    font-size: ${dtFontSize.medium};
    font-weight: 600;
  }

  .content {
    font-size: ${dtFontSize.small};
  }

  .info {
    font-size: ${dtFontSize.xsmall};
  }
`;

export default function Board({ isLast }) {
  return (
    <BoardContainer isLast={isLast}>
      <VoteContainer>
        <svg
          width={25}
          height={25}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
        <p>123</p>
      </VoteContainer>
      <ImageContainer>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII="
          alt="preview"
        />
      </ImageContainer>
      <PostDetailContainer>
        <p className="title">게시글 제목입니다.</p>
        <p className="content">게시글 본문입니다.</p>
        <p className="info">작성자랑 등등</p>
      </PostDetailContainer>
    </BoardContainer>
  );
}
