import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import axios from "axios";

import Overlay from "./Main/Popups/Overlay.jsx";

import {
  primary,
  dtFontSize,
  secondary,
  mbFontSize,
  sub,
} from "../styles/mixins";
import logo from "../assets/logo.svg";
import breakpoint from "../styles/breakpoint";
import user from "../assets/user.svg";
import { useWindowSize } from "../utils/useWindowSize.js";

import styled from "styled-components";

const HeaderContainer = styled.div`
  position: sticky;
  top: 0%;
  left: 0%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 87px;
  background-color: white;
  z-index: 30;
  box-shadow: 0 1px 3px 0 ${sub.sub700};
`;

const LogoContainer = styled.div`
  display: flex;
  width: max-content;
  height: max-content;

  img {
    margin-left: 19%;
  }

  @media screen and (max-width: 1000px) {
    img {
      width: 130px;
      margin-left: 10%;
    }
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    justify-content: center;
    width: 80%;
  }
`;

const HeaderLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 62px;
  margin-left: 5%;

  a,
  h2 {
    min-width: max-content;
    height: max-content;
    text-align: center;
    vertical-align: middle;
    height: max-content;
    font-size: ${dtFontSize.medium};
    padding: 10px 20px;
    padding-top: 12px;
    margin-right: 1.4%;
    color: ${primary.primary500};
    font-weight: 800;
    text-decoration: none;

    &:hover {
      background-color: ${primary.primary500};
      color: white;
      border-radius: 20px;
      cursor: pointer;
    }

    @media screen and (max-width: 1000px) {
      height: 35px;
      font-size: ${dtFontSize.small};
      padding: 10px 10px 0 10px;
    }
  }

  .current {
    background-color: ${primary.primary300};
    color: white;
    border-radius: 20px;

    :hover {
      background-color: ${primary.primary300};
      color: white;
      border-radius: 20px;
    }
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

const LogoutStatusContainer = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  margin: 0 20px;

  .login_linker {
    min-width: max-content;
    height: max-content;
    text-align: center;
    vertical-align: middle;
    height: max-content;
    font-size: ${dtFontSize.medium};
    padding: 10px 20px;
    padding-top: 12px;
    margin-right: 1.4%;
    color: ${primary.primary500};
    font-weight: 800;
    text-decoration: none;

    &:hover {
      background-color: ${primary.primary500};
      color: white;
      border-radius: 20px;
      cursor: pointer;
    }

    @media screen and (max-width: 1000px) {
      height: 35px;
      font-size: ${dtFontSize.small};
      padding: 10px 10px 0 10px;
    }
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: none;
  }
`;

const UserStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4.5%;
  min-width: 180px;
  max-width: 200px;
  width: 16%;
  padding: 10px 0;
  padding-left: 20px;
  height: max-content;
  color: white;
  background-color: ${primary.primary500};
  border-radius: 20px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: none;
  }

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

const HeaderSearchIcon = styled.div`
  display: none;
  width: 10%;
  height: 20px;
  margin-left: 30px;

  &:hover {
    cursor: pointer;

    path {
      fill: ${secondary.secondary500};
    }
  }

  path {
    fill: ${primary.primary500};
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const NavbarIcon = styled.div`
  display: none;
  width: 10%;
  height: 30px;
  margin-left: 30px;

  &:hover {
    cursor: pointer;

    path {
      fill: ${secondary.secondary500};
    }
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    display: flex;
    align-items: center;
  }

  path {
    fill: ${primary.primary500};
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: calc(100px + 30vw);
  background-color: white;
`;

const NavbarProfileBox = styled.div`
  width: 100%;
  height: 30%;
  min-height: 200px;
  background-color: ${primary.primary300};
  display: flex;
  flex-direction: column;
  justify-content: center;

  .usericon {
    margin: 0 0 10px 20px;
  }

  .username {
    display: flex;
    margin-left: 20px;
    color: white;
    font-size: ${mbFontSize.large};

    span {
      font-size: ${mbFontSize.medium};
      font-weight: 400;
    }
  }

  .logout_icon {
    width: max-content;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;

    svg {
      width: 20px;
      height: 20px;
    }

    :hover {
      cursor: pointer;

      path {
        fill: ${primary.primary500};
      }
    }
  }
`;

const NavbarLinkerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  a.current {
    color: ${primary.primary200};
  }

  a {
    width: 100%;
    font-size: ${mbFontSize.large};
    font-weight: 700;
    color: ${primary.primary500};
    padding: 20px 0 30px 20px;
    vertical-align: middle;
    text-decoration: none;

    :hover {
      cursor: pointer;
      background-color: ${primary.primary300};
      color: white;
    }

    @media screen and (max-width: 400px) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

export default function Header() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  useWindowSize(setNavOpen);

  const logoutHandler = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      "Content-Type": "application/json",
      // eslint-disable-next-line prettier/prettier
      "Authorization": `Bearer ${accessToken}`,
      // eslint-disable-next-line prettier/prettier
      "Refresh" : refreshToken,
    };

    return axios
      .get(`${process.env.REACT_APP_SERVER_URI}/members/logout`, { headers })
      .then((response) => {
        sessionStorage.clear();
        localStorage.clear();
        setIsLogin(false);
      });
  };

  return (
    <HeaderContainer>
      <HeaderSearchIcon>
        <Link to="/tickets">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </Link>
      </HeaderSearchIcon>
      <LogoContainer>
        <Link to="/">
          <img width={153} src={logo} alt="logo"></img>
        </Link>
      </LogoContainer>
      <HeaderLinkContainer>
        <Link
          className={location.pathname.includes("tickets") ? "current" : ""}
          to="tickets"
        >
          티켓팅
        </Link>
        <Link
          className={location.pathname.includes("board") ? "current" : ""}
          to="board/free?category=자유게시판&status=최신순&page=1&size=5"
        >
          커뮤니티
        </Link>
        <Link
          className={location.pathname.includes("search") ? "current" : ""}
          to="search"
        >
          공연찾기
        </Link>
        <Link
          className={location.pathname.includes("user") ? "current" : ""}
          to="user/:id"
        >
          마이페이지
        </Link>
      </HeaderLinkContainer>
      {isLogin ? (
        <UserStatus onClick={logoutHandler}>
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
      ) : (
        <LogoutStatusContainer>
          <Link className="login_linker" to="login">
            로그인
          </Link>
          <Link className="login_linker" to="signup">
            회원가입
          </Link>
        </LogoutStatusContainer>
      )}
      <NavbarIcon
        onClick={() => {
          setNavOpen(true);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 3H16V5H2V3Z" fill="black" />
          <path d="M2 8H16V10H2V8Z" fill="black" />
          <path d="M16 13H2V15H16V13Z" fill="black" />
        </svg>
      </NavbarIcon>
      {navOpen && (
        <Overlay handler={setNavOpen}>
          <NavbarContainer>
            {isLogin && (
              <NavbarProfileBox>
                <div className="usericon">
                  <img width={50} src={user} alt="user" />
                </div>
                <div className="username">
                  <h2>
                    User 님 <span>환영합니다!</span>
                  </h2>
                  <div className="logout_icon">
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
              </NavbarProfileBox>
            )}
            <NavbarLinkerContainer>
              {!isLogin && (
                <>
                  <Link to="/login">로그인</Link>
                  <Link to="/signup">회원가입</Link>
                </>
              )}
              <Link
                className={
                  location.pathname.includes("tickets") ? "current" : ""
                }
                to="/tickets"
              >
                티켓팅
              </Link>
              <Link
                className={location.pathname.includes("board") ? "current" : ""}
                to="/board"
              >
                커뮤니티
              </Link>
              <Link
                className={
                  location.pathname.includes("search") ? "current" : ""
                }
                to="search"
              >
                공연찾기
              </Link>
            </NavbarLinkerContainer>
          </NavbarContainer>
        </Overlay>
      )}
    </HeaderContainer>
  );
}
