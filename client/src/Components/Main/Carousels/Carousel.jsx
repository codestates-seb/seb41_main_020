/* eslint-disable react/prop-types */
import React from "react";

import { useState } from "react";

import Spinner from "../../Spinner";

import { primary, sub } from "../../../styles/mixins";
import breakpoint from "../../../styles/breakpoint";
import Arrow from "../../../assets/arrow.svg";
import { useInterval } from "../../../utils/useInterval";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { add } from "date-fns";

const CarouselContainer = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  background-color: ${sub.sub200};
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-bottom: 20px;
    padding: 20px 0;
  }
`;

const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: ${sub.sub400};
  border: 0;
  margin-left: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary200};
  }

  img {
    width: 10px;
    height: 10px;
    transform: rotate(180deg);
  }
`;

const NextButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: ${sub.sub400};
  border: 0;
  margin-right: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${primary.primary200};
  }

  img {
    width: 10px;
    height: 10px;
  }
`;

const Rank = styled.h2`
  position: absolute;
  font-size: calc(60px + 2vw);
  top: 50%;
  left: 12%;
  color: ${primary.primary200};
  font-style: italic;
  pointer-events: none;

  @media screen and (min-width: 1400px) {
    font-size: 80px;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: 60px;
    top: 50%;
    left: calc(5% + 8vw);
  }

  @media screen and (max-width: 500px) {
    top: 70%;
    left: 27%;
    font-size: 40px;
  }
`;

export default function Carousel({
  width,
  height,
  carouselItemList,
  isRankMode,
  minWidth,
  maxWidth,
  status,
  address,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [data, setData] = useState([]);

  const CarouselItemList = carouselItemList;
  const serverURI = process.env.REACT_APP_SERVER_URI;

  const fetchShowData = () => {
    return axios.get(`${serverURI}/shows/sorts`, {
      params: { status, address },
    });
  };

  const fetchShowDataOnSuccess = (response) => {
    const data = response.data.data;
    console.log(data);
    setData(data);
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchShowData", status],
    queryFn: fetchShowData,
    onSuccess: fetchShowDataOnSuccess,
    keepPreviousData: true,
  });

  useInterval(() => {
    if (currentIdx + 1 >= data.length) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }, 3500);

  const pageButtonClickHandler = (num) => {
    if (currentIdx + num < data.length && currentIdx + num >= 0) {
      setCurrentIdx(currentIdx + num);
    }
  };
  return (
    <CarouselContainer
      width={width}
      height={height}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <PrevButton
        onClick={() => {
          pageButtonClickHandler(-1);
        }}
      >
        <img src={Arrow} alt="prev" />
      </PrevButton>
      {isLoading ? (
        <Spinner />
      ) : (
        CarouselItemList &&
        data && <CarouselItemList data={data} currentIdx={currentIdx} />
      )}
      {isRankMode && <Rank>{currentIdx + 1}</Rank>}
      <NextButton
        onClick={() => {
          pageButtonClickHandler(1);
        }}
      >
        <img src={Arrow} alt="next" />
      </NextButton>
    </CarouselContainer>
  );
}
