/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react";

import { sub } from "../../../styles/mixins";

import styled from "styled-components";

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  width: 100vw;
  height: 100vh;
  background-color: ${sub.sub800}D2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    width: 78%;
    text-align: end;
    font-size: 30px;
    font-weight: 500;
    color: white;

    :hover {
      cursor: pointer;
    }
  }
`;

export default function Overlay({ popupHandler, children }) {
  const closePopupHandler = () => {
    popupHandler(false);
  };

  return <BackDrop>{children}</BackDrop>;
}
