//페이지, 리액트 컴포넌트, 정적 파일
import TicketsDetailTap from "../../Components/TicketsDetail/TicketsDetailTapMenu.jsx";
import KakaoMapButton from "../../Components/TicketsDetail/KakaoMapButton.jsx";
import TicketDeleteModal from "../../Components/TicketsDetail/TicketDeleteModal.jsx";

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
import useTicketDataStore from "../../store/useTicketDataStore";
import useOpenModalStore from "../../store/useOpenModalStore.js";

//라이브러리 및 라이브러리 메소드
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
  display: flex;
  flex-direction: column;
  width: 70%;

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
  padding: 40px;
  width: 80%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px;
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

  > h2 {
    all: unset;
    color: ${sub.sub400};
    font-size: ${dtFontSize.medium};
    font-weight: 400;
    margin: 5px 0 0 0;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 205px;
  height: max-content;
  margin: 0 0 0 20px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    margin: 0;
    width: max-content;
    height: 59px;
  }
`;

export const PillButton = styled.button`
  all: unset;
  color: white;
  cursor: pointer;
  width: max-content;
  height: max-content;
  padding: 5px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: ${dtFontSize.medium};
  background-color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.medium};
  }
`;

const ContentTopContainer = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  justify-content: space-between;
  padding: 5%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    padding: 20px 5.13%;
  }
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: max-content;

  @media screen and (max-width: ${breakpoint.mobile}) {
    margin-bottom: 20px;
  }

  > h3 {
    all: unset;
    color: ${sub.sub800};
    width: 100%;
    font-size: ${dtFontSize.large};
    font-weight: 600;
    margin: 5px 0;
    text-align: center;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.large};
    }
  }
`;

const PosterImage = styled.img`
  width: 300px;
  height: 400px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    width: 240px;
    height: 320px;
  }
`;

const Price = styled.span`
  font-size: ${dtFontSize.medium};
  font-weight: 600;
  color: ${sub.sub400};
  margin-bottom: 5px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.medium};
  }
`;

const EmptySeat = styled.span`
  font-size: ${dtFontSize.medium};
  font-weight: 600;
  color: ${sub.sub800};
  margin-bottom: 5px;

  @media screen and (max-width: ${breakpoint.mobile}) {
    font-size: ${mbFontSize.medium};
  }
`;

const TopRightContainer = styled.div`
  display: flex;
  width: 60%;
  background-color: ${sub.sub100};
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: column;
  min-height: 500px;
  padding: 5%;

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 400px;
    width: 100%;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  > div > h3 {
    all: unset;
    color: ${sub.sub800};
    width: 100%;
    font-size: ${dtFontSize.large};
    font-weight: 600;
    margin-bottom: 5px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.large};
    }
  }

  > div > h4 {
    all: unset;
    color: ${sub.sub800};
    width: 100%;
    font-size: ${dtFontSize.large};
    font-weight: 600;
    margin-bottom: 5px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.large};
    }
  }

  > div > .title-description {
    color: ${sub.sub400};

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }

  > div > .sub-title {
    color: ${sub.sub800};
    font-weight: 600;
    margin-bottom: 3px;

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.medium};
    }
  }

  > div > .description {
    color: ${sub.sub800};
    font-weight: 400;
    font-size: ${dtFontSize.small};

    @media screen and (max-width: ${breakpoint.mobile}) {
      font-size: ${mbFontSize.small};
    }
  }

  > .location-container {
    align-items: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: column;
      width: max-content;

      > .location-title {
        color: ${sub.sub800};
        font-weight: 600;
        margin-bottom: 3px;
        width: max-content;
      }

      > .location-description {
        display: inline;
        color: ${sub.sub800};
        font-weight: 400;
        font-size: ${dtFontSize.small};

        @media screen and (max-width: ${breakpoint.mobile}) {
          font-size: ${mbFontSize.small};
        }
      }
    }

    > button {
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
    }
  }
`;

const ImpossibleButton = styled(PillButton)`
  pointer-events: none;
`;

export default function TicketsDetail() {
  const { ticketData, setTicketData } = useTicketDataStore((state) => state);
  const { openModal, setOpenModal } = useOpenModalStore((state) => state);
  const [isReservationPossible, setIsReservationPossible] = useState(true);
  const ticketId = useParams().id;
  const navigate = useNavigate();
  const dummyLocation = {
    title: "연우 소극장",
    address: "서울 종로구 창경궁로35길 21",
    latitude: 37.586999383263084,
    longitude: 127.00176624935142,
  };

  useEffect(() => {
    if (ticketData.emptySeats <= 0) {
      setIsReservationPossible(false);
    }
  }, [ticketData]);

  console.log(isReservationPossible);

  const fetchData = () => {
    return axios.get(`${process.env.REACT_APP_SERVER_URI}/shows/${ticketId}`);
  };

  const fetchDataOnSuccess = (response) => {
    setTicketData(response.data.data && response.data.data);
  };

  const fetchDataOnError = (error) => {
    window.alert("존재하지 않는 공연입니다.");
    navigate("/");
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchData,
    keepPreviousData: false,
    onSuccess: fetchDataOnSuccess,
    onError: fetchDataOnError,
    retry: false,
  });

  const handleMoveToEditPage = () => {
    navigate(`/tickets/${ticketId}/edit`);
  };

  return (
    <>
      <TicketDeleteModal ticketId={ticketId} />
      <Container>
        <ContentHeaderContainer>
          <HeaderTitleContainer>
            <h1>공연 상세페이지</h1>
            <h2>
              {ticketData.title} / {ticketData.nickname}
            </h2>
          </HeaderTitleContainer>
          <HeaderButtonContainer>
            <PillButton
              color={primary.primary300}
              hoverColor={secondary.secondary500}
              onClick={handleMoveToEditPage}
            >
              수정하기
            </PillButton>
            <PillButton
              color={misc.red}
              hoverColor={misc.lightred}
              onClick={setOpenModal}
            >
              삭제하기
            </PillButton>
          </HeaderButtonContainer>
        </ContentHeaderContainer>
        <ContentContainer>
          <ContentTopContainer>
            <TopLeftContainer>
              <PosterImage alt="poster" src={ticketData.image} />
              <h3>{ticketData.title}</h3>
              <Price>₩ {ticketData.price}</Price>
              <EmptySeat>
                잔여 좌석: {ticketData.emptySeats} / {ticketData.total}
              </EmptySeat>
              {isReservationPossible ? (
                <PillButton
                  color={primary.primary300}
                  hoverColor={secondary.secondary500}
                >
                  예매 가능
                </PillButton>
              ) : (
                <ImpossibleButton color={misc.red}>예매 불가</ImpossibleButton>
              )}
            </TopLeftContainer>
            <TopRightContainer>
              <div>
                <h3>{ticketData.title}</h3>
                <h4>{ticketData.nickname}</h4>
                <span className="title-description">
                  {ticketData.address} / {ticketData.detailAddress}
                </span>
              </div>
              <div>
                <span className="sub-title">공연 소개</span>
                <span className="description">{ticketData.content}</span>
              </div>
              <div>
                <span className="sub-title">공연 기간 / 공연 시간</span>
                <span className="description">
                  {ticketData.showAt} ~ {ticketData.expiredAt} /{" "}
                  {ticketData.showTime}시
                </span>
              </div>
              <div className="location-container">
                <div>
                  <span className="location-title">위치</span>
                  <span className="location-description">
                    {ticketData.address} / {ticketData.detailAddress}
                  </span>
                </div>
                {/* <KakaoMapButton location={dummyLocation} /> */}
              </div>
            </TopRightContainer>
          </ContentTopContainer>
          <TicketsDetailTap />
        </ContentContainer>
      </Container>
    </>
  );
}
