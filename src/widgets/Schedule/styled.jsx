import styled from "styled-components";

export const StyledSchedule = styled.section`
  grid-area: sd;
  position: relative;
  background-color: #ffffff;
  overflow: auto;
  width: 100%;
  height: ${({ height }) => `${height + 60}px`};
`;

export const StyledHeader = styled.header`
  min-height: 59px;
  margin-left: 70px;
  border-left: 1px solid #dedfe5;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const StyledContainer = styled.section`
  position: relative;
  height: ${({ height }) => `${height}px`};
  margin-left: ${({ mode }) => (mode === "Week" ? 0 : "70px")};
  border-left: 1px solid #dedfe5;
  overflow: hidden;
  &:first-of-type {
    border: none;
  }
`;

export const StyledGridContainer = styled.article`
  position: absolute;
  top: 59px;
  height: ${({ height }) => `${height}px`};
  width: 100%;
`;

export const StyledWeekContainer = styled.article`
  margin-left: 70px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const StyledDateContainer = styled.article`
  border-left: 1px solid #dedfe5;
  height: 59px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    border: none;
  }
`;
