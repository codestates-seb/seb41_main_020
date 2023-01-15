/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useEffect, useRef } from "react";

import { dtFontSize, primary, sub } from "../../../styles/mixins";

import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
`;

const DateController = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${sub.sub300};
  border-width: 0 0 1px 0;

  p {
    color: ${sub.sub800};
    font-weight: 600;

    :hover {
      color: ${primary.primary300};
      cursor: pointer;
    }
  }

  svg {
    width: 15px;
    height: 15px;
    margin: 10px;
    path {
      fill: ${sub.sub800};

      :hover {
        fill: ${primary.primary300};
      }
    }

    :hover {
      fill: ${primary.primary300};
      cursor: pointer;
    }
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  width: 90%;
  margin: 0 5%;
  height: 100%;
  grid-template-columns: repeat(7, 14.265%);
  grid-template-rows: 1fr 0.2fr repeat(6, 13%);
  border: 1px solid ${sub.sub300};
  border-radius: 20px;

  .item:nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .days {
    text-align: center;
    font-weight: 600;
    padding: 10px 0;
    color: white;
    background-color: ${primary.primary300};
    border: 1px solid white;
    border-width: 0 1px 0 0;
  }

  .days.last {
    border: 1px solid ${primary.primary300};
    border-width: 0 1px 0 0;
  }

  .date_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date {
    text-align: center;
    width: 30px;
    height: 30px;
    padding: 5px;
    font-size: ${dtFontSize.small};

    :hover {
      background-color: ${primary.primary300};
      color: white;
      border-radius: 100%;
      cursor: pointer;
    }

    :focus-within {
      background-color: ${primary.primary300};
      color: white;
      border-radius: 100%;
    }
  }

  p.selected {
    background-color: ${primary.primary300};
    color: white;
    border-radius: 100%;
  }
`;

export default function Calendar({ setSelectedDate }) {
  const [daysArr, setDaysArr] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const isMounted = useRef(0);

  const addPreviousMonthDays = (dateObj, daysArr) => {
    const yearAndDate = `${dateObj.year()}-${dateObj.month() + 1}-`;
    const DOWofFirstDay = dayjs(yearAndDate + "01").$W;
    if (DOWofFirstDay === 0) {
      return daysArr;
    } else {
      const lastMonthDays = dayjs(
        `${dateObj.year()}${dateObj.month() - 1}${dateObj.date()}`
      ).daysInMonth();

      const lastMonthDaysArr = new Array(DOWofFirstDay).fill(0);
      lastMonthDaysArr.reduce((acc, cur, index, arr) => {
        arr[index] = acc;
        return acc - 1;
      }, lastMonthDays);
      lastMonthDaysArr.reverse();
      daysArr = lastMonthDaysArr.concat(daysArr);
      return daysArr;
    }
  };

  useEffect(() => {
    const now = dayjs();
    setSelectedYear(now.year());
    setSelectedMonth(now.month() + 1);
    setSelectedDay(now.date());
    setSelectedDate(now.format("YYYY년 MM월 DD일"));
    let newDaysArr = new Array(now.daysInMonth()).fill(1);
    newDaysArr.reduce((acc, current, index, arr) => {
      arr[index] = acc + 1;
      return acc + current;
    });
    newDaysArr = addPreviousMonthDays(now, newDaysArr);
    setDaysArr(newDaysArr);
  }, []);

  useEffect(() => {
    if (isMounted.current > 2) {
      const selected = dayjs()
        .set("year", selectedYear)
        .set("month", selectedMonth - 1)
        .set("date", selectedDay);
      let newDaysArr = new Array(selected.daysInMonth()).fill(1);
      newDaysArr.reduce((acc, current, index, arr) => {
        arr[index] = acc + 1;
        return acc + current;
      });
      newDaysArr = addPreviousMonthDays(selected, newDaysArr);
      setDaysArr(newDaysArr);
      setSelectedDate(selected.format("YYYY년 MM월 DD일"));
    } else {
      isMounted.current++;
    }
  }, [selectedMonth, selectedYear]);

  const dateOnClickHandler = (e) => {
    const selected = e.target.textContent;
    setSelectedDay(selected);
    setSelectedDate(`${selectedYear}년 ${selectedMonth}월 ${selected}일`);
  };

  const monthSelectorOnClickHandler = (num) => {
    if (selectedMonth <= 1 && num === -1) {
      console.log("<= 1", selectedMonth);
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
    } else if (selectedMonth >= 11 && num === 1) {
      console.log("over 12", selectedMonth);
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(selectedMonth + num);
    }
  };

  return (
    <Container>
      <CalendarGrid>
        <DateController className="item">
          <svg
            onClick={() => {
              monthSelectorOnClickHandler(-1);
            }}
            viewBox="0 0 384 512"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p>{`${selectedYear}년 ${selectedMonth}월`}</p>
          <svg
            onClick={() => {
              monthSelectorOnClickHandler(1);
            }}
            viewBox="0 0 384 512"
          >
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </DateController>
        <p className="item days">일</p>
        <p className="item days">월</p>
        <p className="item days">화</p>
        <p className="item days">수</p>
        <p className="item days">목</p>
        <p className="item days">금</p>
        <p className="item days last">토</p>
        {daysArr.map((day, index) => {
          return (
            <div className="date_container" key={index}>
              <p
                tabIndex={0}
                className={`${
                  parseInt(selectedDay) === day ? "selected" : ""
                } date`}
                onClick={dateOnClickHandler}
              >
                {day}
              </p>
            </div>
          );
        })}
      </CalendarGrid>
    </Container>
  );
}
