import React, { useState, useEffect } from "react";

import ListItem from "./ListItem.jsx";
import Spinner from "../../Spinner.jsx";

import breakpoint from "../../../styles/breakpoint.js";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { dtFontSize, primary } from "../../../styles/mixins.js";

const ListContainer = styled.div`
  width: 100%;
  height: 88%;
  margin: 0 5%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 50%;
    height: 50%;
  }

  .null_data_info_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .null_data_info {
    font-size: ${dtFontSize.medium};
    font-weight: 600;
    color: ${primary.primary300};
  }

  .spinner_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function List({ searchBy, search }) {
  const [data, setData] = useState([]);

  const serverURI = process.env.REACT_APP_SERVER_URI;

  const fetchListData = () => {
    if (searchBy === "location") {
      console.log(search);
      return axios.get(`${serverURI}/shows/location`, {
        params: { address: search },
      });
    } else if (searchBy === "date" && search) {
      console.log(search);
      return axios.get(`${serverURI}/shows/dates`, {
        params: { year: search.year, month: search.month, day: search.day },
      });
    }
  };

  const fetchListDataOnSuccess = (response) => {
    if (searchBy === "location") {
      const data = response.data.data.shows;
      setData(data);
    } else {
      console.log(response);
      const data = response.data.data;
      setData(data);
    }
  };

  const { isLoading, refetch: refetchListData } = useQuery({
    queryKey: ["fetchListData", searchBy, search],
    queryFn: fetchListData,
    onSuccess: fetchListDataOnSuccess,
  });

  useEffect(() => {
    refetchListData();
  }, [search]);

  return (
    <ListContainer>
      {isLoading ? (
        <div className="spinner_container">
          <Spinner />
        </div>
      ) : data.length === 0 ? (
        searchBy === "location" ? (
          <div className="null_data_info_container">
            <p className="null_data_info">
              해당 지역에 공연이 존재하지 않습니다.
            </p>
            <p className="null_data_info">다른 지역을 선택해 주세요.</p>
          </div>
        ) : (
          <div className="null_data_info_container">
            <p className="null_data_info">
              해당 날짜에 공연이 존재하지 않습니다.
            </p>
            <p className="null_data_info">다른 날짜를 선택해 주세요.</p>
          </div>
        )
      ) : (
        data &&
        data.map((data, index) => {
          return <ListItem data={data} key={index} />;
        })
      )}
    </ListContainer>
  );
}
