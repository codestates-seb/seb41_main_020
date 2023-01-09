import React from "react";

import Header from "../Components/Header.jsx";
import Banner from "../Components/Main/Banner.jsx";

import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export default function Home() {
  return (
    <MainContainer>
      <Header />
      <Banner />
    </MainContainer>
  );
}
