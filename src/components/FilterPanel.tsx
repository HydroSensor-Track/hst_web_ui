import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Select, { MultiValue, SingleValue } from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { RootState, AppDispatch } from "../redux/store.ts";
import { setUbicacion, setSensores, setTimestampInicio, setTimestampFin, setUnidadTiempo, setActualizacionTiempo } from '../redux/reducers/querySlice.ts';
import { FilterMainContainer, FilterContainer, FilterTitle, customStyles } from "../styled-components/FilterPanel.tsx";


const FilterPanel = () => {

  const dispatch = useDispatch<AppDispatch>();

  const sensorsByLocation = useSelector((state: RootState) => state.sensorsInfo.byLocation);
  const networkQuery = useSelector((state: RootState) => state.queryChart.red);
  const locationQuery = useSelector((state: RootState) => state.queryChart.ubicacion);
  const sensorQuery = useSelector((state: RootState) => state.queryChart.sensores);
  const timeUnit = useSelector((state: RootState) => state.queryChart.unidadTiempo);
  const timeUpdate = useSelector((state: RootState) => state.queryChart.actualizacionTiempo);

  const [locationOptions, setLocationOptions] = useState([{ value: "", label: "" }]);
  const [sensorOptions, setSensorOptions] = useState([{ value: "", label: "" }]);
  const timeUpdateOptions = [
    { value: 'last_6_hours', label: 'Últimas 6 horas' },
    { value: 'last_12_hours', label: 'Últimas 12 horas' },
    { value: 'last_24_hours', label: 'Últimas 24 horas' },
    { value: 'custom', label: 'Elegir período' }
  ];
  const timeUnitOptions = [
    { value: 'minute', label: 'Minuto' },
    { value: 'hour', label: 'Hora' },
    { value: 'day', label: 'Día' }
  ];

  const [customDisabled, setCustomDisabled] = useState(true);
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);

  const handleLocationChange = (selectedOption: SingleValue<{ value: string; label: string; }>) => {
    dispatch(setUbicacion(selectedOption ? selectedOption.label : locationQuery))
  }

  const handleSensorsChange = (selectedOptions: MultiValue<{ value: string; label: string; }>) => {
    const selectedSensors = selectedOptions ? selectedOptions.map(option => option.value) : [];
    dispatch(setSensores(selectedSensors));
  }

  const handleTimeChange = (selectedOption: SingleValue<{ value: string; label: string; }>) => {
    const now = new Date();

    dispatch(setActualizacionTiempo(selectedOption ? selectedOption.value : timeUpdate))
    if (selectedOption && selectedOption.value === 'custom') {
      setCustomDisabled(false); // Mostrar el DatePicker
      console.log("customDisabled: ", customDisabled);
      return;
    } else {
      setCustomDisabled(true); // Ocultar el DatePicker si no es "Custom"
    }

    let hoursToSubtract;
    switch (selectedOption?.value) {
      case 'last_6_hours':
        hoursToSubtract = 6;
        break;
      case 'last_12_hours':
        hoursToSubtract = 12;
        break;
      case 'last_24_hours':
        hoursToSubtract = 24;
        break;
      default:
        hoursToSubtract = 0;
    }

    const timestampInicio = new Date(now.getTime() - hoursToSubtract * 60 * 60 * 1000); // Restamos las horas
    const timestampFin = now;

    // Despachamos las fechas calculadas
    dispatch(setTimestampInicio(timestampInicio.toISOString()));
    dispatch(setTimestampFin(timestampFin.toISOString()));
  }

  // const handleCustomStartDateChange = (date: Date | null) => {
  //   if (date) {
  //     setStartDate(date);
  //     dispatch(setTimestampInicio(date.toISOString()));
  //   }
  // };

  // const handleCustomEndDateChange = (date: Date | null) => {
  //   if (date) {
  //     setEndDate(date);
  //     dispatch(setTimestampFin(date.toISOString()));
  //   }
  // }

  const handleTimeUnitChange = (selectedOption: SingleValue<{ value: string; label: string; }>) => {
    dispatch(setUnidadTiempo(selectedOption ? selectedOption.value : timeUnit));
  }

  useEffect(() => {
    if (sensorsByLocation && Object.keys(sensorsByLocation).length > 0) {
      const initialLocation = Object.keys(sensorsByLocation[networkQuery])[0];
      dispatch(setUbicacion(initialLocation));

      const locationsArray = sensorsByLocation[networkQuery];
      const locations = Object.keys(locationsArray).map(key => ({
        value: key,
        label: key,
      }));
      setLocationOptions(locations);
    }
  }, [networkQuery, sensorsByLocation, dispatch]);

  useEffect(() => {
    // Asegurarnos de que `locationQuery` esté sincronizado y tenga un valor válido
    if (sensorsByLocation && sensorsByLocation[networkQuery] && sensorsByLocation[networkQuery][locationQuery]) {
      const sensors = sensorsByLocation[networkQuery][locationQuery].map((s) => ({
        value: s.id,
        label: s.id,
      }));

      const sensorValues = sensors.map((sensor) => sensor.value);
      setSensorOptions(sensors);
      dispatch(setSensores(sensorValues));
    }
  }, [sensorsByLocation, locationQuery, networkQuery, dispatch]);

  return (
    <FilterMainContainer>
      <FilterContainer>

        <FilterTitle>
          Filtros
        </FilterTitle>

        {/* Location Filter */}
        <Select
          value={locationOptions.find(option => option.value === locationQuery)}
          options={locationOptions}
          name="locations"
          placeholder="Locacion"
          onChange={handleLocationChange}
          styles={customStyles}
        />

        {/* Sensor Filter */}
        <Select
          value={sensorOptions.filter(option => sensorQuery.includes(option.value))}
          options={sensorOptions}
          isMulti
          name="sensors"
          placeholder="Sensores"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSensorsChange}
          styles={customStyles}
        />

        {/* Time Filter */}
        <Select
          value={timeUpdateOptions.filter(option => option.value === timeUpdate)}
          options={timeUpdateOptions}
          name="time"
          placeholder="Tiempo"
          onChange={handleTimeChange}
          // styles={customStylesTime} 
          styles={customStyles}
        />

        {/*<TimeFilterContainer>

            <CustomDateRangePicker/>
             <CustomDatePicker
              date={startDate}
              onChange={handleCustomStartDateChange}
              disabled={customDisabled}
              placeholder='Desde'
              />
            <CustomDatePicker
              date={endDate}
              onChange={handleCustomEndDateChange}
              disabled={customDisabled}
              placeholder='Hasta'
              /> 
              
          </TimeFilterContainer>*/}

        <Select
          value={timeUnitOptions.find(option => option.value === timeUnit)}
          options={timeUnitOptions}
          onChange={handleTimeUnitChange}
          placeholder="Unidad de tiempo"
          styles={customStyles}
        />
      </FilterContainer>
    </FilterMainContainer>
  );
};

export default FilterPanel;