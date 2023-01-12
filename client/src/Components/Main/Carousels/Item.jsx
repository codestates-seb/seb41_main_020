/* eslint-disable react/prop-types */
import React from "react";

import { dtFontSize, primary, sub } from "../../../styles/mixins";

import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 100%;
  margin: 0 10%;
`;

const ImageContainer = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const ConcertDetailsContainer = styled.div`
  width: max-content;
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
    font-size: ${dtFontSize.medium};
    text-align: center;
  }

  h3 {
    font-size: ${dtFontSize.small};
    margin-top: 10px;
    text-align: center;
  }

  .date {
    font-size: ${dtFontSize.xsmall};
    font-weight: 400;
    color: ${sub.sub400};
    margin-top: 10px;
    text-align: center;
  }

  .location {
    font-size: ${dtFontSize.xsmall};
    font-weight: 800;
    color: ${sub.sub400};
    margin-top: 10px;
    text-align: center;
  }
`;
export default function Item({ data }) {
  return (
    <ItemContainer>
      <ImageContainer>
        <img width={120} height={150} src={data.img} alt="poster" />
      </ImageContainer>
      <ConcertDetailsContainer>
        <h2>{data.title}</h2>
        <h3>{data.artist}</h3>
        <h4 className="date">{data.date}</h4>
        <h4 className="location">{data.location}</h4>
      </ConcertDetailsContainer>
    </ItemContainer>
  );
}
