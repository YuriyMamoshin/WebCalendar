import styled from "styled-components";

export const StyledScheduleLine = styled.section`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  position: relative;

  &:first-of-type {
    border-top: 2px solid #dedfe5;
  }
`;

export const StyledEventsBox = styled.article`
  border-bottom: 1px solid #dedfe5;
  border-left: 1px solid #dedfe5;
  height: 100%;
  margin-left: 70px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
`;

export const StyledTimeBox = styled.p`
  position: absolute;
  top: 70px;
  left: 20px;
`;
