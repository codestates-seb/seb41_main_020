/* eslint-disable react/prop-types */
import React from "react";

import { dtFontSize, primary, sub } from "../../../styles/mixins";

import styled from "styled-components";
import { Link } from "react-router-dom";

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 100%;
  margin: 0 10%;

  a {
    text-decoration: none;
    color: inherit;

    :hover {
      color: none;
    }
  }
`;

const ImageContainer = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;

  img {
    height: calc(100px + 2vw);
    max-height: 150px;
  }
`;

const ConcertDetailsContainer = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    color: ${primary.primary400};
    cursor: pointer;

    > .date {
      color: ${primary.primary300};
    }

    > .location {
      color: ${primary.primary300};
    }
  }

  h2 {
    font-size: calc(8px + 0.5vw);
    text-align: center;

    @media screen and (min-width: 1400px) {
      font-size: ${dtFontSize.medium};
    }
  }

  h3 {
    font-size: calc(2px + 0.5vw);
    margin-top: 10px;
    text-align: center;
    @media screen and (min-width: 1400px) {
      font-size: ${dtFontSize.medium};
    }
  }

  .date {
    font-size: calc(2px + 0.3vw);
    font-weight: 400;
    color: ${sub.sub400};
    margin-top: 10px;
    text-align: center;

    @media screen and (min-width: 1400px) {
      font-size: ${dtFontSize.xsmall};
    }
  }

  .location {
    font-size: calc(2px + 0.3vw);
    font-weight: 800;
    color: ${sub.sub400};
    margin-top: 10px;
    text-align: center;
    @media screen and (min-width: 1400px) {
      font-size: ${dtFontSize.xsmall};
    }
  }
`;
export default function Item({ data }) {
  return (
    <ItemContainer>
      <ImageContainer>
        <img src={data.image} alt="poster" />
      </ImageContainer>
      <Link to={`tickets/${data.id}`}>
        <ConcertDetailsContainer>
          <h2>{data.title}</h2>
          <h3>{data.nickname}</h3>
          <h4 className="date">{`${data.showAt} - ${data.expiredAt}`}</h4>
          <h4 className="location">{data.detailAddress}</h4>
        </ConcertDetailsContainer>
      </Link>
    </ItemContainer>
  );
}
