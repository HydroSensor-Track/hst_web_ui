import styled from "styled-components";
import DatePicker from "react-datepicker";


export const CustomDatePicker = styled(DatePicker)`

  /* Personaliza el calendario */
  .react-datepicker-wrapper {
    background-color: #111111;
    color: white;
    width: 30%;
  }

  .react-datepicker__day {
    color: #000;
  }

  .react-datepicker__day--selected {
    background-color: #4a90e2;
    color: white;
  }
`;