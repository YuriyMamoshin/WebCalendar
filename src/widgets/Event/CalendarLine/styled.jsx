import styled from "styled-components";

export const StyledCalendarLine = styled.section`
  width: 100%;
  padding-left: 2px;
  display: flex;
  align-items: center;
  gap: 10px;

  & div {
    width: 12px;
    height: 12px;
    border-radius: 4px;
    background-color: ${({ color }) => color};
  }
`;
