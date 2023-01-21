import React from "react";

import { primary, dtFontSize, sub } from "../../../styles/mixins";
import breakpoint from "../../../styles/breakpoint";

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

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: 2vw;
    }
  }

  .date {
    width: max-content;
    font-size: ${dtFontSize.small};
    margin-left: 10px;
    margin-bottom: 5px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: 2vw;
    }
  }
`;

export default function ListItem({ data }) {
  return (
    <ListItemContainer>
      <p className="title">{data.title}</p>
      <p className="date">{`${data.showAt} - ${data.expiredAt}`}</p>
    </ListItemContainer>
  );
}
