/* eslint-disable react/prop-types */
import React from "react";

import { primary, dtFontSize } from "../../../styles/mixins";

import styled from "styled-components";
import Board from "./Board.jsx";

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

export default function Boards({ children }) {
  return (
    <BoardsContainer>
      <h1>{children}</h1>
      <BoardList>
        <Board></Board>
        <Board></Board>
        <Board></Board>
        <Board></Board>
        <Board isLast={true}></Board>
      </BoardList>
    </BoardsContainer>
  );
}
