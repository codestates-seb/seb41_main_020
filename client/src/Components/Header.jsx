import React from "react";

import { primary } from "../styles/mixins";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 87px;
`;

export default function Header() {
  return <HeaderContainer>Header</HeaderContainer>;
}
