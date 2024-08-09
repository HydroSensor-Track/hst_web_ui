import styled from 'styled-components';

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const HomeText = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
`;

export const HomeButton = styled.button`
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.colors.primary_faded};
    }
`;

export const FilterContainer = styled.div`
  background-color: #111;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

export const FilterTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const LabelSelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  margin-right: 10px;
`;

export const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;