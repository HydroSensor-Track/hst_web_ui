import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePicker } from '../../styled-components/DateRangePicker';



const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div style={{'width' :'100%', 'display':'flex', 'justifyContent': 'row'}}>
      <CustomDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      />
      <CustomDatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
      />
    </div>
  );
};

export default DateRangePicker;