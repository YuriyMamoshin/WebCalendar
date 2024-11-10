import styled from "styled-components";

export const StyledControlButton = styled.button`
  width: 16px;
  height: 16px;
  border: none;
  background-color: transparent;
  background-image: url(${({ iconName }) =>
    `src/assets/icons/${iconName}.svg`});
  background-position: center;
  background-size: contain;
`;
