import React from "react";

import { primary, dtFontSize } from "../styles/mixins";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 87px;
  font-size: ${dtFontSize.xlarge};
`;

export default function Header() {
  return <HeaderContainer>Header</HeaderContainer>;
}
