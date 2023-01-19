//페이지, 리액트 컴포넌트, 정적 파일
import TicketsDetailTap from "./TicketsDetailTapMenu.jsx";
import kakaoMapIcon from "../../assets/kakaoMapIcon.jpg";

//로컬 모듈
import breakpoint from "../../styles/breakpoint";

//라이브러리 및 라이브러리 메소드
import { React, useState } from "react";
import styled from "styled-components/macro";
import axios from "axios";

const ButtonComponent = styled.button`
  all: unset;
  cursor: pointer;
  display: inline;
  width: 40px;
  height: 40px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 30px;
    height: 30px;
  }

  > img {
    border-radius: 100%;
    width: 40px;
    height: 40px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      width: 30px;
      height: 30px;
    }
  }
`;

export default function KakaoMapButton({ location }) {
  const [locationId, setLocationId] = useState("");

  const headers = {
    // eslint-disable-next-line prettier/prettier
    "Authorization": `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
  };

  axios
    .get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?y=${location.latitude}&x=${location.longitude}&query=${location.title}&page=1&size=1`,
      { headers }
    )
    .then((response) => {
      setLocationId(response.data.documents[0].id);
    });

  const handleButtonClick = () => {
    window.open(`https://map.kakao.com/link/map/${locationId}`);
  };

  console.log(process.env.REACT_APP_REST_API_KEY);
  console.log(location);

  return (
    <ButtonComponent onClick={handleButtonClick}>
      <img alt="kakao map icon" src={kakaoMapIcon} />
    </ButtonComponent>
  );
}
