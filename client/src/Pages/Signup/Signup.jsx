//페이지, 리액트 컴포넌트, 정적 파일
import logo from "../../assets/logo.svg";

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
import { React, useState, useRef } from "react";
import styled from "styled-components/macro";
// import { Outlet } from "react-router-dom";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: center;
  margin: 0 auto;
  min-height: calc(100vh - 87px);
  width: 100%;
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 55%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
  }

  > .page-info-container {
    display: flex;
    flex-direction: column;

    > img {
      margin-bottom: 30px;
      width: 220px;
    }

    > span {
      color: ${sub.sub400};
      font-size: ${dtFontSize.medium};
      font-weight: 400;
    }
  }
`;

const SignupContainer = styled.div`
  align-items: center;
  background-color: ${primary.primary100};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: space-between;
  min-height: 450px;
  padding: 20px;
  width: 350px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 320px;
    height: 280px;
    padding: 15px;
  }

  > .input-container {
    display: flex;
    flex-direction: column;

    > label {
      color: white;
      font-size: ${dtFontSize.medium};
      font-weight: 600;
      margin-bottom: 10px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.medium};
      }
    }

    > input {
      border: none;
      border-radius: 5px;
      color: ${sub.sub400};
      font-size: ${dtFontSize.small};
      width: 300px;
      height: 40px;
      padding: 0 10px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.small};
        width: 250px;
        height: 25px;
      }
    }
  }

  > button {
    all: unset;
    background-color: ${primary.primary300};
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: ${dtFontSize.medium};
    font-weight: 600;
    text-align: center;
    width: 300px;
    height: 50px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
      width: 250px;
      height: 40px;
    }

    &:hover {
      background-color: ${secondary.secondary500};
    }
  }
`;

export default function Signup() {
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <ContentContainer>
        <div className="page-info-container">
          <img alt="logo" src={logo} />
          <span>
            indiego는 지역 인디 공연 문화를 위한 서비스 플랫폼입니다. <br />
            회원가입을 통해 indiego 커뮤니티를 이용할 수 있습니다.
          </span>
        </div>
        <SignupContainer>
          <div className="input-container">
            <label htmlFor="e-mail" id="e-mail">
              닉네임
            </label>
            <input
              id="nickname"
              placeholder="닉네임"
              value={nickname || ""}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="e-mail" id="e-mail">
              이메일
            </label>
            <input
              id="e-mail"
              placeholder="이메일"
              value={email || ""}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" id="password">
              비밀번호
            </label>
            <input
              id="password"
              placeholder="비밀번호"
              value={password || ""}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button>회원가입</button>
        </SignupContainer>
      </ContentContainer>
    </Container>
  );
}
