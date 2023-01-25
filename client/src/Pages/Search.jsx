import React, { useState, useEffect, useRef } from "react";

import SearchBar from "../Components/Main/SearchBar.jsx";
import KaKaoMap from "../Components/Search/KaKaoMap.jsx";

import { primary, dtFontSize, sub } from "../styles/mixins";
import breakpoint from "../styles/breakpoint.js";
import marker from "../assets/marker.svg";
import "../styles/MarkerOverlay.css";

import { locationDummyArr } from "../DummyData/locationDummy";

import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

  const [data, setData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [XBoundary, setXBoundary] = useState();
  const [YBoundary, setYBoundary] = useState();

  const mapElement = useRef();
  const clustererElement = useRef();
  const markersArray = useRef([]);

  const markerImageSrc = marker;
  const markerImageSize = new kakao.maps.Size(64, 64);
  const markerImageOption = { offset: new kakao.maps.Point(27, 69) };

  const markerImage = new kakao.maps.MarkerImage(
    markerImageSrc,
    markerImageSize,
    markerImageOption
  );

  const fetchMarkersInfo = () => {
    setFetchTrigger(false);
    const params = { XBoundary, YBoundary };
    console.log(
      `searchURI : ${process.env.REACT_APP_SERVER_URI}/shows/maps?x1=${params.XBoundary[0]}&x2=${params.XBoundary[1]}&y1=${params.YBoundary[0]}&y2=${params.YBoundary[1]}`
    );
    return axios.get(`${process.env.REACT_APP_SERVER_URI}/shows/maps`, params);
  };

  const fetchMarkersInfoOnSuccess = (res) => {
    const data = res.data.data;
    setData(data);
  };

  useQuery({
    queryKey: ["fetchMarkersInfo", XBoundary, YBoundary],
    queryFn: fetchMarkersInfo,
    onSuccess: fetchMarkersInfoOnSuccess,
    enabled: fetchTrigger,
  });

  // 지도 초기 생성
  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.556, 126.9723), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    if (!mapContainer.hasChildNodes()) {
      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);
      mapElement.current = map;

      map.setMaxLevel(9);

      // 클러스터러 객체 생성
      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 3,
      });
      clustererElement.current = clusterer;

      // 지도에 컨트롤 추가
      const mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 맵 이벤트 핸들러 추가
      kakao.maps.event.addListener(map, "zoom_changed", () => {
        const bounds = map.getBounds();
        const sePoint = bounds.getSouthWest();
        const nePoint = bounds.getNorthEast();

        const XBoundaryValue = [sePoint.getLat(), nePoint.getLat()];
        const YBoundaryValue = [sePoint.getLng(), nePoint.getLng()];

        setXBoundary(XBoundaryValue);
        setYBoundary(YBoundaryValue);

        setFetchTrigger(true);
      });

      kakao.maps.event.addListener(map, "dragend", () => {
        const bounds = map.getBounds();
        const sePoint = bounds.getSouthWest();
        const nePoint = bounds.getNorthEast();

        const XBoundaryValue = [sePoint.getLat(), nePoint.getLat()];
        const YBoundaryValue = [sePoint.getLng(), nePoint.getLng()];

        setXBoundary(XBoundaryValue);
        setYBoundary(YBoundaryValue);

        setFetchTrigger(true);
      });
    }
  }, []);

  // data fatching 후 marker 생성
  useEffect(() => {
    // 맵, 클러스터 인스턴스 불러오기
    const map = mapElement.current;
    const clusterer = clustererElement.current;

    if (markersArray.current.length > 0) {
      markersArray.current.forEach((marker) => {
        marker.setMap(null);
        clusterer.removeMarker(marker);
      });
    }

    const markers =
      data &&
      data.map((locObj) => {
        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(locObj.latitude, locObj.longitude),
          clickable: true,
          image: markerImage,
        });
        // 지도에 마커 추가
        marker.setMap(map);
        // 클릭시 커스텀 오버레이 생성
        const popupWindow = new kakao.maps.CustomOverlay({
          position: marker.getPosition(),
        });
        // 마커 팝업 마크업 생성 및 이벤트 핸들러 할당
        const markerClickPopup = document.createElement("div");
        markerClickPopup.setAttribute("class", "marker_container");
        const markerBox = document.createElement("div");
        markerBox.setAttribute("class", "marker_box");
        const imgElement = document.createElement("img");
        Object.assign(imgElement, {
          width: 80,
          className: "poster",
          src: locObj.img,
        });
        const titleElement = document.createElement("p");
        titleElement.setAttribute("class", "marker_title");
        titleElement.textContent = locObj.title;
        const addressElement = document.createElement("p");
        addressElement.setAttribute("class", "marker_address");
        addressElement.textContent = locObj.address;
        const dateElement = document.createElement("p");
        dateElement.setAttribute("class", "marker_date");
        dateElement.textContent = locObj.date;
        const closeButtonElement = document.createElement("div");
        closeButtonElement.setAttribute("class", "close");
        closeButtonElement.textContent = "닫기";
        closeButtonElement.onclick = function () {
          popupWindow.setMap(null);
        };
        const svgElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svgElement.setAttribute("class", "triangle");
        svgElement.setAttribute("viewBox", "0 0 300 512");
        const trianglePathElem = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        trianglePathElem.setAttribute("class", "triangle_path");
        trianglePathElem.setAttributeNS(
          null,
          "d",
          "M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
        );
        svgElement.appendChild(trianglePathElem);
        markerBox.append(
          imgElement,
          titleElement,
          addressElement,
          dateElement,
          closeButtonElement,
          svgElement
        );
        markerClickPopup.appendChild(markerBox);
        popupWindow.setContent(markerClickPopup);
        // 마커 호버 마크업
        const markerHoverPopup = `
          <div class="hover_container">
          <p class="hover_title">${locObj.title}</p>
          <p class="hover_date">${locObj.date}</p>
          </div>`;
        const hoverWindow = new kakao.maps.CustomOverlay({
          content: markerHoverPopup,
          position: marker.getPosition(),
        });
        closeButtonElement.addEventListener("onclick", () => {
          popupWindow.setMap(null);
        });
        // 카카오 맵 이벤트 리스너
        kakao.maps.event.addListener(
          marker,
          "click",
          (() => {
            return function () {
              popupWindow.setMap(map);
              const moveLocation = new kakao.maps.LatLng(
                locObj.latitude,
                locObj.longitude
              );
              map.setLevel(4, { anchor: moveLocation });
              map.setCenter(moveLocation);
            };
          })(locObj)
        );
        kakao.maps.event.addListener(marker, "mouseover", function () {
          hoverWindow.setMap(map);
        });
        kakao.maps.event.addListener(marker, "mouseout", function () {
          hoverWindow.setMap(null);
        });

        return marker;
      });

    markersArray.current = markers;

    // 클러스터에 배열 형태로 된 마커들을 전달하면 클러스터 생성
    clusterer.addMarkers(markers);
  }, [data]);

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
