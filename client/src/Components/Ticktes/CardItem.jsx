import React from "react";

import breakpoint from "../../styles/breakpoint";
import { primary, dtFontSize, sub, misc } from "../../styles/mixins";

import styled from "styled-components";
import { Link } from "react-router-dom";

const CardItemContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${sub.sub200};
  border-radius: 20px;
  position: relative;
  padding: 10px;
  transition: all 0.1s ease-in-out;

  a {
    text-decoration: none !important;
    color: inherit;
  }

  &:hover {
    background-color: ${primary.primary300};
    color: white;
    cursor: pointer;
    transform: translateY(-20px);
    box-shadow: 0 5px 5px ${sub.sub400};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  height: max-content;
  margin-bottom: 20px;

  img {
    width: 50%;
    box-shadow: 0 5px 5px ${sub.sub400};
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: calc(8px + 1vw);
    margin-bottom: 5px;

    @media screen and (min-width: ${breakpoint.mobile}) {
      font-size: ${dtFontSize.medium};
    }
  }

  h3 {
    font-size: calc(5px + 1vw);
    font-weight: 500;
    margin-bottom: 5px;

    @media screen and (min-width: ${breakpoint.mobile}) {
      font-size: ${dtFontSize.small};
    }
  }

  h4 {
    font-size: calc(3px + 1vw);
    font-weight: 400;
    margin-bottom: 5px;

    @media screen and (min-width: ${breakpoint.mobile}) {
      font-size: ${dtFontSize.xsmall};
    }
  }

  .price {
    font-size: calc(5px + 1vw);
    font-weight: 500;

    @media screen and (min-width: ${breakpoint.mobile}) {
      font-size: ${dtFontSize.small};
    }
  }
`;

const BookmarkContainer = styled.div`
  display: flex;
  position: absolute;

  svg {
    width: 15px;
    height: 15px;

    path {
      fill: ${sub.sub500};
    }

    :hover {
      path {
        fill: ${misc.orange};
      }
    }
  }
`;

export default function CardItem({ data }) {
  return (
    <CardItemContainer>
      <BookmarkContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
        </svg>
      </BookmarkContainer>
      <Link to="/tickets/:id">
        <ImageContainer>
          <img src={data.img} alt="poster" />
        </ImageContainer>
        <DetailContainer>
          <h2>{data.title}</h2>
          <h3>{data.artist}</h3>
          <h4>{data.detail}</h4>
          <h4 className="price">{`${data.price} ₩`}</h4>
          <h4>{data.location}</h4>
          <h4>{data.date}</h4>
        </DetailContainer>
      </Link>
    </CardItemContainer>
  );
}