import styled from "styled-components";
import React, { useState } from "react";
import { primary, sub } from "../../../styles/mixins";
import search from "../../../assets/search.svg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useBoardListStore from "../../../store/useBoardListStore";
import ScrollTop from "../../../utils/ScrollTop";

const SearchBarDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;

  .aSearchBarDiv {
    width: 500px;
    border: 3px solid ${sub.sub500};
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding-right: 9px;

    .searchBarInput {
      width: 100%;
      border-radius: 20px;
      padding: 10px;
      height: 40px;
      border: none;

      &:focus-within {
        outline: none;
      }
    }

    .searchImage {
      width: 17px;
      height: 17px;
    }
    &:focus-within {
      border: 3px solid ${primary.primary200};
    }
  }

  .listButton {
    background-color: blue;
  }
`;

const SearchBar = ({ category, placeholder }) => {
  const [value, setValue] = useState("");
  const { setBoardListData } = useBoardListStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    // searchBoardList();
    axios
      .get(
        `http://indiego.kro.kr:80/articles?articles?category=${category}&search=${value}&page=1&size=10
        `
      )
      .then((res) => setBoardListData(res.data.data));
    window.scrollTo(0, 0);
  };

  // const searchBoardList = async () => {
  //   const response = await axios.get(
  //     `http://indiego.kro.kr:80/articles?articles?category=자유게시판&search=${value}`
  //   );
  //   return response.data.data;
  // };

  // const searchBoardListOnSuccess = (response) => {
  //   setBoardListData(response);
  // };
  // const { isLoading, isError, error } = useQuery({
  //   queryKey: ["searchBoardList"],
  //   queryFn: searchBoardList,
  //   onSuccess: searchBoardListOnSuccess,
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error : {error.message}</div>;
  // }

  return (
    <form onSubmit={handleSubmit}>
      <SearchBarDiv>
        <div className="aSearchBarDiv">
          <input
            className="searchBarInput"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <img className="searchImage" src={search} alt="돋보기"></img>
        </div>
      </SearchBarDiv>
    </form>
  );
};

export default SearchBar;
