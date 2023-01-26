/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState, useEffect, useRef } from "react";

import SearchBar from "../../Components/Main/SearchBar.jsx";
import Button from "../../Components/Main/Button.jsx";
import ItemList from "../../Components/Ticktes/ItemList.jsx";
import SeoulMap from "../../Components/Main/Popups/SeoulMap.jsx";
import Overlay from "../../Components/Main/Popups/Overlay.jsx";
import SearchOptions from "../../Components/Ticktes/SearchOptions.jsx";

import breakpoint from "../../styles/breakpoint";
import {
  primary,
  sub,
  dtFontSize,
  mbFontSize,
  secondary,
} from "../../styles/mixins";
import { dummyArr } from "../../DummyData/mainDummy.js";
import "../../styles/ReactDatePicker.css";

import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Components/Spinner.jsx";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
`;

const ContentHeaderContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: space-between;
  min-height: 100px;
  padding: 30px 47px;
  width: 90%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px 5.13%;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    all: unset;
    color: ${primary.primary500};
    font-size: ${dtFontSize.xxlarge};
    font-weight: 700;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.xlarge};
    }
  }

  > h2 {
    all: unset;
    color: ${sub.sub400};
    font-size: ${dtFontSize.medium};
    font-weight: 400;
    margin: 5px 0 0 0;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

const SearchBarContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
  margin-bottom: 50px;
`;

const ItemListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const SpinnerExtended = styled(Spinner)`
  position: absolute;
  left: 50%;
  top: 50%;

  .lds-dual-ring:after {
    border: 6px solid ${primary.primary300};
    border-color: ${primary.primary300} transparent ${primary.primary300}
      transparent;
  }
`;

export default function Tickets() {
  const [searchParams] = useSearchParams();
  const queryParams = [...searchParams.entries()];
  const [data, setData] = useState([]);

  const fetchShowData = () => {
    const params = {};

    queryParams.forEach((queryArr) => {
      params[queryArr[0]] = queryArr[1];
    });

    return axios.get(`${process.env.REACT_APP_SERVER_URI}/shows`, {
      params,
    });
  };

  const fetchShowDataOnSuccess = (response) => {
    const data = response.data.data;
    setData(data);
  };

  const { isLoading, refetch } = useQuery({
    queryKey: ["fetchShowData"],
    queryFn: fetchShowData,
    onSuccess: fetchShowDataOnSuccess,
    retry: false,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <Container>
      <ContentHeaderContainer>
        <HeaderTitleContainer>
          <h1>공연 검색</h1>
          <h2>찾고자 하는 공연이 열리는 지역과 기간, 공연명을 입력하세요.</h2>
        </HeaderTitleContainer>
      </ContentHeaderContainer>
      <ContentContainer>
        <SearchBarContainer>
          <SearchOptions />
        </SearchBarContainer>
        {isLoading ? (
          <SpinnerExtended refetch={refetch} />
        ) : (
          <ItemListContainer>
            <ItemList data={data} />
          </ItemListContainer>
        )}
      </ContentContainer>
    </Container>
  );
}
