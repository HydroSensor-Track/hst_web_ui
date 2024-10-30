import React from "react";
import DatePicker from "react-datepicker";
import './styles.css'; // Importa tu archivo CSS personalizado

interface DatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
  disabled: boolean;
  placeholder: string
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
    date,
    onChange,
    disabled = true,
    placeholder
}) => {
    
  return (
    <DatePicker
    selected={date}
    onChange={onChange}
    className="custom-datepicker" // Clase personalizada para el input
    // calendarClassName="custom-datepicker-calendar" // Clase personalizada para el calendario
    showTimeSelect
    selectsStart
    placeholderText={placeholder}
    dateFormat="Pp"
    disabled={disabled}
    />
  );
};

export default CustomDatePicker;