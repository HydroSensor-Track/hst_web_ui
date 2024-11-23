import styled from "styled-components";

export const SensorInfoContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.componentBackground};
  border-radius: 12px;
  height: 68%;

  @media (max-width: 768px) {
    height: auto;
  }
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

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const LocationTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LocationLabel = styled.span`
  font-weight: bold;

  @media (max-width: 768px) {
    text-decoration: underline;
  }
`;

export const LocationValue = styled.span`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const LocationBattery = styled(LocationValue)`
  color: #ffc107;
`;
