//페이지, 리액트 컴포넌트, 정적 파일
import TicketsDetailTapDesc from "./TicketsDetailTapDesc.jsx";
import TicketsDetailTapReview from "./TicketsDetailTapReview.jsx";

//로컬 모듈
import breakpoint from "../../styles/breakpoint";
import {
  primary,
  secondary,
  sub,
  misc,
  dtFontSize,
  mbFontSize,
} from "../../styles/mixins";

//라이브러리 및 라이브러리 메소드
import { React, useRef, useState } from "react";
import styled from "styled-components/macro";

const Tabs = styled.ul`
  all: unset;
  background-color: white;
  border-bottom: 1px solid ${sub.sub200};
  display: flex;
  margin-top: 5%;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;

  > li {
    all: unset;
    align-items: center;
    cursor: pointer;
    font-size: ${dtFontSize.large};
    font-weight: 600;
    color: ${sub.sub400};
    justify-content: center;
    padding: 10px 20px;
    width: max-content;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.large};
    }

    &.focused {
      color: ${primary.primary500};
      border-bottom: 5px solid ${primary.primary500};
    }
  }
`;

const TapContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 1500px;
  padding: 5%;
`;

export default function TicketsDetailTap() {
  const [currentTab, setCurrentTab] = useState(0);
  const tabContentRef = useRef();

  const menuArr = [
    { name: "공연 상세", content: <TicketsDetailTapDesc /> },
    { name: "공연 한 줄 평", content: <TicketsDetailTapReview /> },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    tabContentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Tabs>
        {menuArr.map((ele, index) => {
          return (
            <li
              className={currentTab === index ? "focused" : null}
              role="presentation"
              key={index}
              onClick={() => selectMenuHandler(index)}
            >
              {ele.name}
            </li>
          );
        })}
      </Tabs>
      <TapContent ref={tabContentRef}>{menuArr[currentTab].content}</TapContent>
    </>
  );
}
