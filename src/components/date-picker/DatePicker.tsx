import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateRangePicker, { DateRange, RangeType } from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';
import { AppDispatch, RootState } from "../../redux/store";
import { setTimestampFin, setTimestampInicio } from "../../redux/reducers/querySlice";
import { fetchMetricUpdateBySensor } from "../../redux/reducers/sensorMetricsSlice";

interface DatePickerProps {
  disabled: boolean;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
    disabled = true,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const timestampInicio = useSelector((state: RootState) => state.queryChart.timestampInicio);
  const timestampFin = useSelector((state: RootState) => state.queryChart.timestampFin);
  const ubicacion = useSelector((state: RootState) => state.queryChart.ubicacion);
  const red = useSelector((state: RootState) => state.queryChart.red);
  const sensores = useSelector((state: RootState) => state.queryChart.sensores);

  const [startDate, setStartDate] = useState(new Date(timestampInicio))
  const [endDate, setEndDate] = useState(new Date(timestampFin))

  useEffect(()=> {
    setStartDate(new Date(timestampInicio))
    setEndDate(new Date(timestampFin))
  }, [timestampInicio, timestampFin])

  const handleRangeSelected = (dateRange: DateRange) => {
    const startDateRange = dateRange[0]
    const endDateRange = dateRange[1]
    dispatch(setTimestampFin(endDateRange.toISOString()));
    dispatch(setTimestampInicio(startDateRange.toISOString()));
    dispatch(fetchMetricUpdateBySensor({from:startDateRange, to: endDateRange, ubicacion: ubicacion, red: red, sensors: sensores }))
  }

  const handleShortcutClicked = (rangeType: RangeType) => {
    handleRangeSelected(rangeType.value as DateRange)
  }

  return (

    <DateRangePicker
      value={[startDate, endDate]}
      onOk={handleRangeSelected}
      onShortcutClick={handleShortcutClicked}
      format="MM/dd/yyyy HH:mm"
      disabled={disabled} 
      style={{width: "100%"}}/>
  );
};

export default CustomDatePicker;
