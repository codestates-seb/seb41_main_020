import React from "react";

import { primary, dtFontSize } from "../styles/mixins";
import logo from "../assets/logo.svg";

import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 87px;
`;

const LogoContainer = styled.div`
  width: 210px;
  height: max-content;

  img {
    margin-left: 19%;
  }
`;

const HeaderLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;
  height: 62px;

  h2 {
    width: max-content;
    font-size: ${dtFontSize.medium};
    padding: 0 4%;
    margin-right: 1.4%;
    color: ${primary.primary500};
    font-weight: 800;

    @media screen and (max-width: 1200px) {
      font-size: ${dtFontSize.small};
    }
  }
`;

const UserStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4.5%;
  min-width: 180px;
  width: 16%;
  padding: 10px 0;
  padding-left: 20px;
  height: max-content;
  color: white;
  background-color: ${primary.primary500};
  border-radius: 20px;

  div {
    display: flex;
    justify-content: space-between;
  }

  .welcome {
    font-size: ${dtFontSize.medium};

    @media screen and (max-width: 1200px) {
      font-size: ${dtFontSize.small};
    }
  }

  .username {
    font-size: ${dtFontSize.small};

    @media screen and (max-width: 1200px) {
      font-size: ${dtFontSize.xsmall};
    }
  }

  .iconbox {
    margin-right: 10px;

    .usericon {
      margin-right: 5px;
    }

    path:hover {
      fill: ${primary.primary100};
      cursor: pointer;
    }
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={logo} alt="logo"></img>
      </LogoContainer>
      <HeaderLinkContainer>
        <h2>티켓팅</h2>
        <h2>커뮤니티</h2>
        <h2>공연찾기</h2>
        <h2>마이페이지</h2>
      </HeaderLinkContainer>
      <UserStatus>
        <p className="welcome">환영합니다!</p>
        <div className="iconbox">
          <p className="username">unknown user 님!</p>
          {/* user icon */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="15"
              height="15"
              className="usericon"
            >
              <path
                fill="white"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
            {/* logout icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="15"
              height="15"
              className="logouticon"
            >
              <path
                fill="white"
                d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
              />
            </svg>
          </div>
        </div>
      </UserStatus>
    </HeaderContainer>
  );
}
