import React, { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./ReactDatePicker.css";

const ReactDatePicker = ({ setDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    setDate(startDate.toISOString().substring(0, 10));
  }, [startDate]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div>
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        customInput={<ExampleCustomInput />}
      />
      {/* {console.log(startDate.toLocaleString())} */}
    </div>
  );
};

export default ReactDatePicker;
