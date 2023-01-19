//페이지, 리액트 컴포넌트, 정적 파일
import dummyProfileImage from "../../assets/dummyProfileImage.jpg";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PillButton } from "../Tickets/TicketsDetail";
import useSelectProfileLocationModalStore from "../../store/useSelectProfileLocationModalStore";
import useSelectedProfileLocationStore from "../../store/useSelectedProfileLocationStore.js";
import SelectProfileLocationModal from "../../Components/Profile/SelectProfileLocationModal";

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
import { React, useEffect, useState } from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`;

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 70%;
  height: max-content;
  padding: 3.5%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const ContentHeaderContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${sub.sub200};
  display: flex;
  height: max-content;
  justify-content: space-between;
  min-height: 140px;
  padding: 20px 40px;
  width: 80%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px;
    width: 100%;
  }
`;

const PageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PageTitle = styled.h1`
  all: unset;
  color: ${(props) => props.fontColor};
  font-size: ${dtFontSize.xxlarge};
  font-weight: 700;

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.xlarge};
  }
`;

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 2% 0 3% 0;

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.xlarge};
  }

  > span {
    color: ${sub.sub400};
    font-weight: 400;
    font-size: ${dtFontSize.medium};

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

const SubTitle = styled.h2`
  all: unset;
  color: ${(props) => props.fontColor};
  font-size: ${dtFontSize.xlarge};
  font-weight: 600;
  display: flex;

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.xlarge};
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  justify-content: space-between;
  width: 100%;
  min-height: 1000px;
  background-color: ${sub.sub100};
  border-radius: 10px;
  padding: 5%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 800px;
  }

  > .edit-profile-image-container {
    display: flex;
    flex-direction: column;

    > .profile-image-container {
      position: relative;
      display: flex;
      width: max-content;

      > img {
        height: 140px;
        width: 140px;

        @media screen and (max-width: ${breakpoint.mobile}) {
          height: 80px;
          width: 80px;
        }
      }
    }

    > p {
      color: ${sub.sub400};
      font-size: ${dtFontSize.small};
      font-weight: 400;
      margin-top: 30px;
    }
  }

  > .edit-nickname-container {
    display: flex;
    flex-direction: column;

    > .nickname-input {
      font-size: ${dtFontSize.small};
      height: 25px;
      width: 250px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.small};
        width: 150px;
      }
    }

    > .validation-message-container {
      display: flex;
      flex-direction: column;
      margin: 5px 0;
      width: max-content;

      > .validation-message {
        all: unset;
        color: ${misc.red};
        font-size: ${dtFontSize.small};

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.small};
        }
      }
    }
  }

  > .edit-location-container {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      align-items: center;

      > .location-input {
        font-size: ${dtFontSize.small};
        height: 25px;
        width: 250px;
        margin-right: 10px;

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.small};
          width: 150px;
        }
      }
    }
  }

  > .edit-about-container {
    display: flex;
    flex-direction: column;

    > .about-input {
      font-size: ${dtFontSize.small};
      width: 100%;
      height: 300px;
      padding: 10px;

      @media screen and (max-width: ${breakpoint.mobile}) {
        font-size: ${mbFontSize.small};
        height: 200px;
      }
    }
  }

  > .complete-button-container {
    display: flex;
    justify-content: center;
  }
`;

const EditContainerSubTitle = styled.h3`
  color: ${(props) => props.fontColor};
  font-weight: 600;
  font-size: ${dtFontSize.large};
  margin-bottom: 10px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.large};
  }
`;

const EditProfileImageButton = styled.button`
  all: unset;
  border-radius: 100%;
  cursor: pointer;
  height: 40px;
  text-align: center;
  width: 40px;
  position: absolute;
  background-color: ${(props) => props.buttonColor};
  bottom: -20px;
  right: -20px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    height: 26px;
    width: 26px;
    right: -13px;
    bottom: -13px;
  }
`;

export default function ProfileEdit() {
  const [isPerformer, setIsPerFormer] = useState(true);
  const [fontColor, setfontColor] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [buttonHoverColor, setButtonHoverColor] = useState("");
  const [nickname, setNickname] = useState();
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameInputOnFocus, setNicknameInputOnFocus] = useState(false);

  const { openModal, setOpenModal } = useSelectProfileLocationModalStore(
    (state) => state
  );
  const { location, setLocation } = useSelectedProfileLocationStore(
    (selectedLocation) => selectedLocation
  );

  const handleProfilEditPageColor = () => {
    if (isPerformer) {
      setfontColor(secondary.secondary600);
      setButtonColor(secondary.secondary500);
      setButtonHoverColor(primary.primary200);
    } else {
      setfontColor(primary.primary500);
      setButtonColor(primary.primary300);
      setButtonHoverColor(secondary.secondary500);
    }
  };

  useEffect(() => {
    handleProfilEditPageColor();
  }, []);

  useEffect(() => {
    if (nickname && nickname.length <= 10) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  }, [nickname]);

  console.log(openModal);

  return (
    <Container>
      <SelectProfileLocationModal />
      <ContentHeaderContainer>
        <PageTitleContainer>
          <PageTitle fontColor={fontColor}>마이페이지</PageTitle>
        </PageTitleContainer>
      </ContentHeaderContainer>
      <ContentContainer>
        <SubTitleContainer>
          <SubTitle fontColor={fontColor}>내 정보 수정하기</SubTitle>
          <span>내 정보를 확인하고 수정할 수 있습니다</span>
        </SubTitleContainer>
        <EditContainer>
          <div className="edit-profile-image-container">
            <EditContainerSubTitle fontColor={fontColor}>
              나의 프로필 사진
            </EditContainerSubTitle>
            <div className="profile-image-container">
              <EditProfileImageButton
                buttonColor={buttonColor}
                buttonHoverColor={buttonHoverColor}
              >
                <FontAwesomeIcon icon={faPlus} color="white" />
              </EditProfileImageButton>
              <img alt="profile img" src={dummyProfileImage} />
            </div>
            <p>
              이미지 파일의 형식은 jpg, jpeg, png로 권장합니다 <br /> 파일의
              크기는 10MB 이하로 제한됩니다
            </p>
          </div>
          <div className="edit-nickname-container">
            <EditContainerSubTitle fontColor={fontColor}>
              닉네임
            </EditContainerSubTitle>
            <input
              className="nickname-input"
              maxLength="10"
              value={nickname || ""}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              onFocus={() => setNicknameInputOnFocus(true)}
            />
            {nicknameInputOnFocus ? (
              <ul className="validation-message-container">
                {nicknameValid ? (
                  ""
                ) : (
                  <li className="validation-message">
                    ⚠︎ 닉네임은 1자 이상 10자 이하여야 합니다
                  </li>
                )}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="edit-location-container">
            <EditContainerSubTitle fontColor={fontColor}>
              우리 동네
            </EditContainerSubTitle>
            <div>
              <input className="location-input" value={location} />
              <PillButton
                color={buttonColor}
                hoverColor={buttonHoverColor}
                onClick={setOpenModal}
              >
                지역 선택
              </PillButton>
            </div>
          </div>
          <div className="edit-about-container">
            <EditContainerSubTitle fontColor={fontColor}>
              소개
            </EditContainerSubTitle>
            <textarea className="about-input" />
          </div>
          <div className="complete-button-container">
            <PillButton color={buttonColor} hoverColor={buttonHoverColor}>
              수정 완료
            </PillButton>
          </div>
        </EditContainer>
      </ContentContainer>
    </Container>
  );
}
