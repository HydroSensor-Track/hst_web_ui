import styled from "styled-components";

export const LocationContainer = styled.div`
  background-color: #111;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LocationTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
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