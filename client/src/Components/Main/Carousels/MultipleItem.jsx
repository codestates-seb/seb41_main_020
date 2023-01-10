/* eslint-disable react/prop-types */
import React from "react";

import { dtFontSize, primary, sub } from "../../../styles/mixins";

import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 70%;
  margin: 0 1%;
  padding: 0 10px;
  background-color: ${sub.sub300};
  border-radius: 20px;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const ConcertDetailsContainer = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;

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
export default function MultipleItem({ data }) {
  return (
    <ItemContainer>
      <ImageContainer>
        <img width={100} height={130} src={data.img} alt="poster" />
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
