import React from "react";
import styled from "styled-components";
import Aside from "./Aside/Aside.jsx";

const Wrapper = styled.div`
  background-color: pink;
  height: 500px;
  text-align: center;
  display: flex;
`;

export default function Board() {
  return (
    <Wrapper>
      <Aside></Aside>
      자유게시판 자유
    </Wrapper>
  );
}
