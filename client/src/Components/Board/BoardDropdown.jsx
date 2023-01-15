import React, { useState } from "react";
import styled from "styled-components";

import { sub, dtFontSize, primary } from "../../styles/mixins";

const DropdownDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  /* background-color: black; */
  position: relative;
`;

const SelectButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: ${sub.sub300};
  color: white;
  border-radius: 5px;
  border: none;
  text-align: center;
  z-index: -10;
`;

const DropdownContainer = styled.div`
  width: 100%;
  background-color: ${sub.sub300};
  color: white;
  position: absolute;
  left: 0;
  transition: all 0.6s ease-in-out;

  &.open {
    top: 28px; // 위치
    opacity: 1; //투명도
    pointer-events: "none"; // 안보일때 누르는거 막아놓음
  }

  &.close {
    top: 0px; // 위치
    opacity: 0; //투명도
    pointer-events: "none"; // 안보일때 누르는거 막아놓음
  }

  > ul {
    > li {
      list-style: none;
      padding: 2px 0;
      font-size: ${dtFontSize.small};

      &:hover {
        background-color: ${primary.primary400};
      }
    }
  }
`;

const BoardDropdown = () => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("최신순");

  const handleDropdown = (props) => {
    setValue(props);
    setToggle(!toggle);
  };
  return (
    <DropdownDiv>
      <SelectButton type="button" onClick={() => setToggle(!toggle)}>
        {value}
      </SelectButton>
      <DropdownContainer className={toggle ? "open" : "close"}>
        <ul>
          <li
            role="presentation"
            onClick={() => {
              handleDropdown("최신순");
            }}
          >
            최신순
          </li>
          <li
            role="presentation"
            onClick={() => {
              handleDropdown("인기순");
            }}
          >
            인기순
          </li>
        </ul>
      </DropdownContainer>
    </DropdownDiv>
  );
};

export default BoardDropdown;
