import React from "react";

import { primary, dtFontSize, sub } from "../../../styles/mixins";

import styled from "styled-components";

const ListItemContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  border: 1px solid ${sub.sub500};
  border-width: 0 0 1px 0;
  color: ${sub.sub800};
  margin-top: 10px;

  :hover {
    cursor: pointer;
    color: ${primary.primary500};
  }

  .title {
    width: max-content;
    font-size: ${dtFontSize.medium};
    margin-left: 10px;
    margin-top: 10px;
    font-weight: 700;
  }

  .date {
    width: max-content;
    font-size: ${dtFontSize.small};
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

export default function ListItem() {
  return (
    <ListItemContainer>
      <p className="title">우리동네 락밴드 크리스마스 공연</p>
      <p className="date">2022 년 12 월 24일 ~ 2022년 12월 25일</p>
    </ListItemContainer>
  );
}
