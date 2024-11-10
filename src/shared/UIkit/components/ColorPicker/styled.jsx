import styled from "styled-components";

export const StyledColor = styled.label`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ checked }) => (checked ? "#323749" : "transparent")};
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    opacity: 0;
    position: absolute;
  }

  & div {
    width: 12px;
    height: 12px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 4px;
  }
`;

export const StyledColorPicker = styled.article`
  & label {
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 10px;
    color: #323749;
    margin-bottom: 4px;
  }

  & section {
    width: 230px;
    height: 70px;
    border: 1px solid #dedfe5;
    border-radius: 8px;
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
    justify-items: center;
    align-items: center;
    gap: 10px;
  }
`;
