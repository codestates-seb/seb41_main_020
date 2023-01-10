//페이지, 리액트 컴포넌트, 정적 파일
import TicketsDetailTapDesc from "./TicketsDetailTapDesc.jsx";
import TicketsDetailTapReview from "./TicketsDetailTapReview.jsx";
import TicketsDetailTapQnA from "./TicketsDetailTapQnA.jsx";

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
import { React, useState } from "react";
import styled from "styled-components/macro";

const Tabs = styled.ul`
  all: unset;
  display: flex;
  width: 100%;

  > li {
    all: unset;
    cursor: pointer;
    font-size: ${dtFontSize.large};
    font-weight: 600;
    color: ${sub.sub400};
    padding: 10px 20px;
    width: max-content;

    &.focused {
      color: ${primary.primary500};
      border-bottom: 5px solid ${primary.primary500};
    }
  }
`;

export default function TicketsDetailTap() {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "공연 상세", content: <TicketsDetailTapDesc /> },
    { name: "공연 한 줄 평", content: <TicketsDetailTapReview /> },
    { name: "질문 / 문의", content: <TicketsDetailTapQnA /> },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
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
      <div>{menuArr[currentTab].content}</div>
    </>
  );
}
