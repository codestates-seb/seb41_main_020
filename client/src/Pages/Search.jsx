import React, { useState, useEffect } from "react";

import SearchBar from "../Components/Main/SearchBar.jsx";

import { primary, dtFontSize, sub } from "../styles/mixins";
import breakpoint from "../styles/breakpoint.js";
import marker from "../assets/marker.svg";

import { locationDummyArr } from "../DummyData/locationDummy";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  display: flex;
  width: 90%;
  height: max-content;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const ContentHeaderContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: max-content;
  align-items: space-between;
  min-height: 100px;
  padding: 30px 47px;
  width: 90%;

  h1 {
    color: ${primary.primary500};
  }

  h2 {
    all: unset;
    color: ${sub.sub400};
    font-size: ${dtFontSize.medium};
    font-weight: 400;
    margin: 5px 0 0 0;
  }

  @media screen and (max-width: ${breakpoint.mobile}) {
    min-height: 100px;
    padding: 20px 5.13%;
    width: 100%;
  }
`;

export default function Search() {
  const { kakao } = window;
  const [locationPoint, setLocationPoint] = useState({});

  const markerImageSrc = marker;
  const markerImageSize = new kakao.maps.Size(64, 64);
  const markerImageOption = { offset: new kakao.maps.Point(27, 69) };

  const markerImage = new kakao.maps.MarkerImage(
    markerImageSrc,
    markerImageSize,
    markerImageOption
  );

  // 지도 초기 생성
  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.556, 126.9723), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 클러스터 관련
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 3,
    });

    // 마커 동적 생성
    const markers = locationDummyArr.map((locObj) => {
      // 마커 생성

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(locObj.latitude, locObj.longitude),
        clickable: true,
        image: markerImage,
      });

      // 지도에 마커 추가
      marker.setMap(map);

      // 마커 팝업 마크업
      const markerClickPopup = `<div style="padding:5px;">${locObj.title}</div>`;

      const markerHoverPopup = `<div style="padding:5px; background-color:blue; color:white;">${locObj.title}</div>`;

      // 카카오 맵 이밴트 핸들러
      const popupWindow = new kakao.maps.InfoWindow({
        content: markerClickPopup,
        removable: true,
      });

      const hoverWindow = new kakao.maps.InfoWindow({
        content: markerHoverPopup,
      });

      // 카카오 맵 이벤트 리스너
      kakao.maps.event.addListener(
        marker,
        "click",
        (() => {
          return function () {
            popupWindow.open(map, marker);
            const moveLocation = new kakao.maps.LatLng(
              locObj.latitude,
              locObj.longitude
            );
            map.setLevel(4, { anchor: moveLocation });
          };
        })(locObj)
      );

      kakao.maps.event.addListener(marker, "mouseover", function () {
        hoverWindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", function () {
        hoverWindow.close();
      });

      return marker;
    });

    // 클러스터에 배열 형태로 된 마커들을 전달하면 클러스터 생성
    clusterer.addMarkers(markers);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  });

  return (
    <Container>
      <ContentHeaderContainer>
        <h1>공연 찾기</h1>
        <h2>찾고자 하는 공연을 위치기반으로 검색합니다.</h2>
      </ContentHeaderContainer>
      <SearchBar />
      <MapContainer>
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
      </MapContainer>
    </Container>
  );
}
