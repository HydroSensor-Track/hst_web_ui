import styled from "styled-components";

export const SensorInfoContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.componentBackground};
  border-radius: 12px;
  height: 68%;
`;

export const LocationContainer = styled.div`
  background-color: ${(props) => props.theme.colors.componentBackground};
  color: ${(props) => props.theme.colors.text};
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LocationTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%;
`;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LocationLabel = styled.span`
  font-weight: bold;
`;

export const LocationValue = styled.span`
  font-size: 16px;
`;

export const LocationBattery = styled(LocationValue)`
  color: #ffc107;
`;
