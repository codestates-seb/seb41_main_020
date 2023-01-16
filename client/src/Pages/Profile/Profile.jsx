//페이지, 리액트 컴포넌트, 정적 파일
import dummyProfileImage from "../../assets/dummyProfileImage.jpg";
import { PillButton } from "../Tickets/TicketsDetail.jsx";

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
import React from "react";
import styled from "styled-components/macro";
import ShowList from "../../Components/Profile/ShowList.jsx";

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
  border: 3px solid red;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

const ContentHeaderContainer = styled.div`
  align-items: flex-start;
  border-bottom: 1px solid ${sub.sub200};
  display: flex;
  height: max-content;
  justify-content: space-between;
  min-height: 140px;
  padding: 20px 47px;
  width: 80%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px 5.13%;
    width: 100%;
  }
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    all: unset;
    color: ${primary.primary500};
    font-size: ${dtFontSize.xxlarge};
    font-weight: 700;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.xlarge};
    }
  }
`;

const ContentInnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 5%;

  border: 3px solid orange;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 20px 5.13%;
  }
`;

const ProfileInfoContainer = styled.div`
  border: 3px solid pink;
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    display: flex;
    align-items: flex-end;
    > img {
      border: 3px solid red;
      border-radius: 100%;
      height: 140px;
      width: 140px;
    }

    > div {
      display: flex;
      flex-direction: column;
      margin: 0 0 10px 20px;
      > .user-nickname {
        color: ${primary.primary500};
        font-size: ${dtFontSize.xlarge};
        font-weight: 600;
      }

      > .user-email {
        color: ${sub.sub400};
        font-size: ${dtFontSize.medium};
        font-weight: 400;
      }
    }
  }
`;

const LocationandAboutContainer = styled.div`
  align-items: center;
  border: 3px solid blue;
  display: flex;
  height: max-content;
  min-height: 250px;
  width: 80%;
  background-color: ${sub.sub100};
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: column;
  padding: 4%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }

  > div {
    align-items: center;
    display: flex;
    flex-direction: column;

    > .sub-title {
      color: ${primary.primary500};
      font-size: ${dtFontSize.medium};
      font-weight: 600;
      margin-bottom: 5px;
    }

    > .sub-location-info {
      color: ${sub.sub800};
      font-size: ${dtFontSize.medium};
      font-weight: 600;
    }

    > .sub-info {
      color: ${sub.sub800};
      font-size: ${dtFontSize.small};
      font-weight: 400;
      text-align: center;
    }
  }
`;

const ContentMiddleContainer = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 50px;
  border: 3px solid green;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 20px 5.13%;
  }
`;

const MiddleInnerContainer = styled.div`
  align-items: center;
  border: 3px solid blue;
  display: flex;
  height: max-content;
  min-height: 250px;
  width: 80%;
  background-color: ${sub.sub100};
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: column;
  padding: 4%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 100%;
  }
`;

export default function Profile() {
  return (
    <Container>
      <ContentHeaderContainer>
        <HeaderTitleContainer>
          <h1>마이페이지</h1>
        </HeaderTitleContainer>
      </ContentHeaderContainer>
      <ContentContainer>
        <ContentInnerContainer>
          <ProfileInfoContainer>
            <div>
              <img alt="dummy profile" src={dummyProfileImage} />
              <div>
                <span className="user-nickname">김아무개</span>
                <span className="user-email">amugae1234@gmail.com</span>
              </div>
            </div>
            <PillButton
              color={primary.primary300}
              hoverColor={secondary.secondary500}
            >
              프로필 수정하기
            </PillButton>
          </ProfileInfoContainer>
          <LocationandAboutContainer>
            <div>
              <span className="sub-title">활동 지역</span>
              <span className="sub-location-info">종로구</span>
            </div>
            <div>
              <span className="sub-title">소개</span>
              <span className="sub-info">
                국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나
                대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.
                대통령은 법률에서 구체적으로 범위를 정하여 위임받은 사항과
                법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수
                있다.
              </span>
            </div>
          </LocationandAboutContainer>
        </ContentInnerContainer>
        <ContentInnerContainer>
          <MiddleInnerContainer>
            <ShowList />
          </MiddleInnerContainer>
        </ContentInnerContainer>
      </ContentContainer>
    </Container>
  );
}
