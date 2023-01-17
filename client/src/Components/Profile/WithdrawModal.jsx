//페이지, 리액트 컴포넌트, 정적 파일
import useWithdrawModalStore from "../../store/useWithdrawModalStore.js";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
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
import React, { useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";

const ModalBackdrop = styled.div`
  align-items: center;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const ModalWindow = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  position: relative;
  justify-content: center;
  width: 500px;
  height: 300px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 280px;
  }

  > svg {
    color: ${sub.sub400};
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
  }

  > .modal-inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span {
      color: ${sub.sub800};
      font-size: ${dtFontSize.medium};
      font-weight: 400;
    }

    > .button-container {
      display: flex;
      width: 200px;
      justify-content: space-between;
      margin-top: 50px;
    }
  }
`;

const ModalButton = styled.button`
  all: unset;
  border: 1px solid ${sub.sub300};
  color: ${(props) => props.color};
  cursor: pointer;
  width: 80px;
  height: max-content;
  padding: 5px 0;
  border-radius: 6px;
  font-weight: 600;
  font-size: ${dtFontSize.medium};
  background-color: white;
  text-align: center;

  &:hover {
    background-color: ${sub.sub200};
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.medium};
  }
`;

export default function WithdrawModal() {
  const { openModal, setOpenModal } = useWithdrawModalStore((state) => state);
  const navigate = useNavigate();

  const handleWithdraw = () => {
    setOpenModal();
    window.alert("회원 탈퇴가 정상적으로 처리되었습니다.");
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      {openModal === true ? (
        <ModalBackdrop onClick={setOpenModal}>
          <ModalWindow onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faTimes} size="2x" onClick={setOpenModal} />
            <div className="modal-inner-container">
              <span>정말로 탈퇴하시겠습니까?</span>
              <div className="button-container">
                <ModalButton color={misc.red} onClick={handleWithdraw}>
                  예
                </ModalButton>
                <ModalButton color={sub.sub400} onClick={setOpenModal}>
                  아니오
                </ModalButton>
              </div>
            </div>
          </ModalWindow>
        </ModalBackdrop>
      ) : null}
    </>
  );
}
