/* eslint-disable react/prop-types */
import React from "react";

import { primary, secondary } from "../../styles/mixins";

import styled from "styled-components";

const StyledButton = styled.button`
  width: 120px;
  padding: 10px;
  border-radius: 20px;
  background-color: ${primary.primary300};
  border: 0;
  color: white;
  margin: 10px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: ${secondary.secondary500};
  }
`;

export default function Button({ children, clickEvent, className }) {
  const buttonClickHandler = (e) => {
    clickEvent();
  };

  return (
    <StyledButton onClick={buttonClickHandler} className={className}>
      {children}
    </StyledButton>
  );
}
