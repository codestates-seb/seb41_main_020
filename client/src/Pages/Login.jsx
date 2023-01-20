//페이지, 리액트 컴포넌트, 정적 파일
import logo from "../assets/logo.svg";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//로컬 모듈
import breakpoint from "../styles/breakpoint";
import {
  primary,
  secondary,
  sub,
  misc,
  dtFontSize,
  mbFontSize,
} from "../styles/mixins";
import useIsLoginStore from "../store/useLoginStore";

//라이브러리 및 라이브러리 메소드
import { React, useState, useRef } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
  flex-direction: column;
  width: max-content;

  > .logo {
    margin-bottom: 20px;
    width: 220px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      margin-bottom: 10px;
      width: 153px;
    }
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const LoginContainer = styled.div`
  align-items: center;
  background-color: ${primary.primary100};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: max-content;
  min-height: 350px;
  justify-content: space-between;
  padding: 20px;
  width: 450px;

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

    > div {
      display: flex;
      height: max-content;
      width: max-content;
      position: relative;

      > input {
        border: none;
        border-radius: 5px;
        color: ${sub.sub400};
        font-size: ${dtFontSize.small};
        width: 350px;
        height: 40px;
        padding: 0 10px;

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.small};
          width: 250px;
          height: 25px;
        }
      }

      > button {
        all: unset;
        cursor: pointer;
        right: 1%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);

        > svg {
          color: ${sub.sub300};
        }
      }
    }

    > .keep-login-container {
      align-items: center;
      display: flex;
      margin-top: 20px;

      > .keep-login-checkbox {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 1.5px solid ${sub.sub200};
        border-radius: 2px;
        margin-right: 5px;

        @media screen and (max-width: ${breakpoint.mobile}) {
          width: 16px;
          height: 16px;
        }

        &:checked {
          border-color: transparent;
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: 50%;
          background-repeat: no-repeat;
          background-color: ${primary.primary300};
        }
      }

      > label {
        color: white;
        font-size: ${dtFontSize.medium};
        font-weight: 600;

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.medium};
        }
      }
    }
  }

  > .error-message {
    color: ${misc.red};
    font-size: ${dtFontSize.medium};
    font-weight: 600;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
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
    width: 350px;
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

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordInputType, setPasswordInputType] = useState({
    type: "password",
    visible: false,
  });
  const [errorMessageContent, setErrorMessageContent] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const data = { email: email, password: password };

  const { isLogin, setIsLogin } = useIsLoginStore((state) => state);

  const handlePasswordInputType = () => {
    if (!passwordInputType.visible) {
      setPasswordInputType({ type: "text", visible: true });
    } else {
      setPasswordInputType({ type: "password", visible: false });
    }
  };

  const postLoginData = () => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    return axios.post(
      `${process.env.REACT_APP_SERVER_URI}members/login`,
      data,
      headers,
      { withCredentials: true }
    );
  };

  const postLoginOnSuccess = (response) => {
    const accessToken = response.headers.get("Authorization").split(" ")[1];
    sessionStorage.setItem("accessToken", accessToken);
    // axios.defaults.headers.common["Authorization"] = accessToken;
    setIsLogin(true);
    localStorage.setItem("userInfoStorage", JSON.stringify(response.data.data));
  };

  const postLoginOnError = (err) => {
    if (err.response.status === 401) {
      setErrorMessageContent("이메일 혹은 비밀번호를 다시 확인해주세요");
    }
  };

  const { mutate: postLogin } = useMutation({
    mutationKey: ["postLoginData"],
    mutationFn: postLoginData,
    onSuccess: postLoginOnSuccess,
    onError: postLoginOnError,
  });

  const handleLogin = () => {
    if (!email) {
      emailInputRef.current.focus();
      setErrorMessageContent("⚠︎ 이메일을 입력해주세요");
      return;
    } else if (!password) {
      passwordInputRef.current.focus();
      setErrorMessageContent("⚠︎비밀번호를 입력해주세요");
    } else {
      setErrorMessageContent("");
      postLogin();
    }
  };

  const handleEnterPressLogin = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfoStorage"));

  console.log(userInfo);

  return (
    <Container>
      <ContentContainer>
        <img alt="logo" className="logo" src={logo} />
        <LoginContainer>
          <div className="input-container">
            <label htmlFor="e-mail" id="e-mail">
              이메일
            </label>
            <div>
              <input
                id="e-mail"
                onKeyPress={handleEnterPressLogin}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="이메일"
                ref={emailInputRef}
                value={email || ""}
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="password" id="password">
              비밀번호
            </label>
            <div>
              <button onClick={handlePasswordInputType}>
                {passwordInputType.visible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
              <input
                id="password"
                ref={passwordInputRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="비밀번호"
                value={password || ""}
                type={passwordInputType.type}
              />
            </div>
            <div className="keep-login-container">
              <input
                id="keepLogin"
                type="checkbox"
                className="keep-login-checkbox"
              />
              <label label htmlFor="keepLogin" id="keepLogin">
                로그인 유지
              </label>
            </div>
          </div>
          {errorMessageContent ? (
            <span className="error-message">{errorMessageContent}</span>
          ) : (
            ""
          )}
          <button onClick={handleLogin}>로그인</button>
        </LoginContainer>
      </ContentContainer>
    </Container>
  );
}
