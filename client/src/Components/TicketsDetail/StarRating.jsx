//페이지, 리액트 컴포넌트, 정적 파일
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Star = styled.div`
  display: flex;

  .star {
    color: ${sub.sub300};
    cursor: pointer;

    :hover {
      color: ${misc.orange};
    }

    & :hover ~ .star {
      color: ${sub.sub300};
    }
  }

  .filled {
    color: ${misc.orange};
  }
`;

export default function StarRating() {
  const starsArray = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [hovered, setHovered] = useState([false, false, false, false, false]);
  let score = clicked.filter(Boolean).length;

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const handleStarHover = (index) => {
    let hoverStates = [...hovered];
    for (let i = 0; i < 5; i++) {
      hoverStates[i] = i <= index ? true : false;
    }
    setHovered(hoverStates);
  };

  return (
    <div>
      <Star>
        {starsArray.map((el, idx) => (
          <FontAwesomeIcon
            icon={faStar}
            key={idx}
            onClick={() => handleStarClick(el)}
            onMouseEnter={() => handleStarHover(el)}
            className={clicked[idx] || hovered[idx] ? "star filled" : "star"}
          />
        ))}
      </Star>
    </div>
  );
}
