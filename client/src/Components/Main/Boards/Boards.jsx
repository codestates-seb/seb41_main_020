/* eslint-disable react/prop-types */
import React, { useState } from "react";

import Board from "./Board.jsx";

import { primary, dtFontSize } from "../../../styles/mixins";

import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Spinner.jsx";

const BoardsContainer = styled.div`
  width: 100%;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    width: 88%;
    color: ${primary.primary500};
    font-size: ${dtFontSize.medium};
    margin-bottom: 10px;
  }
`;

const BoardList = styled.ul`
  width: 90%;
  padding: 0;
  height: 300px;
  background-color: aquamarine;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-radius: 10px;
`;

export default function Boards({ category, children }) {
  const [data, setData] = useState([]);

  const serverURI = process.env.REACT_APP_SERVER_URI;

  const fetchBoardData = () => {
    return axios.get(`${serverURI}/articles`, {
      params: { category },
    });
  };

  const fetchBoardDataOnSuccess = (response) => {
    const data = response.data.data;
    console.log(data);
    setData(data);
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchBoardData", category],
    queryFn: fetchBoardData,
    onSuccess: fetchBoardDataOnSuccess,
  });

  return (
    <BoardsContainer>
      <h1>{children}</h1>
      <BoardList>
        {isLoading ? (
          <Spinner />
        ) : (
          data &&
          data.map((data, index) => {
            if (index === data.length - 1) {
              return <Board isLast={true} key={data.id} />;
            }
            return <Board data={data} key={data.id} />;
          })
        )}
        {/* <Board></Board>
        <Board></Board>
        <Board></Board>
        <Board></Board>
        <Board isLast={true}></Board> */}
      </BoardList>
    </BoardsContainer>
  );
}
