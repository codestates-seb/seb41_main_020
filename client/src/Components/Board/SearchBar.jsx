import styled from "styled-components";
import React from "react";
import { primary, sub } from "../../styles/mixins";
import search from "../../assets/search.svg";

const SearchBarDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;

  .aSearchBarDiv {
    width: 30vw;
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

const SearchBar = ({ placeholder }) => {
  return (
    <SearchBarDiv>
      <div className="aSearchBarDiv">
        <input className="searchBarInput" placeholder={placeholder} />
        <img className="searchImage" src={search} alt="돋보기"></img>
      </div>
    </SearchBarDiv>
  );
};

export default SearchBar;
