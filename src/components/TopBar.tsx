import { StyledTopBar, ButtonContainer } from "../styled-components/TopBar.tsx";
import { useTranslation } from "react-i18next";
import NormalTitle from "./NormalTitle.tsx";
import { useLocation } from "react-router-dom";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { setRed } from "../redux/reducers/querySlice.ts";
import { customStyles } from "../styled-components/FilterPanel.tsx";
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from "react";

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className }: TopBarProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const currentNetwork = useSelector((state: RootState) => state.queryChart.red);
  const sensorsByLocation = useSelector((state: RootState) => state.sensorsInfo.byLocation);

  const [networkOptions, setNetworkOptions] = useState([{value: "", label: ""}])

  const { t } = useTranslation();
  const location = useLocation();

  function renderExtraComponents() {
    if (location.pathname === "/") {
      return (
        <>
              <Select 
          value={networkOptions.find(option => option.value === currentNetwork)}
          options={networkOptions}
          name="networks"
          placeholder="Red"
          onChange={handleNetworkChange}
          styles={customStyles} 
          />
          <ButtonContainer>
            <Button label={t("downloadReport")} icon={<Icon name="download" />} />
            <Button label={t("createGraph")} icon={<Icon name="eastArrow" />} />
          </ButtonContainer>
        </>
      );
    }
  }

  
  useEffect(() => {

    const networkArray = Object.keys(sensorsByLocation);
    if (sensorsByLocation && networkArray.length > 0) {
          const networks = networkArray.map(key => ({
              value: key,   
              label: key
          }));
          setNetworkOptions(networks);
      }

}, [sensorsByLocation]);

  const handleNetworkChange = (selectedOption: SingleValue<{ value: string; label: string; }>) => {
    dispatch(setRed(selectedOption ? selectedOption.label: ""))
  }

  return (
    <StyledTopBar className={className}>
      <NormalTitle>{t("dashboard")}</NormalTitle>
      {renderExtraComponents()}
    </StyledTopBar>
  );
};
export default TopBar;
