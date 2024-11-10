import styled from "styled-components";

export const StyledEventBar = styled.section`
  position: absolute;
  width: 100%;
  background-color: ${({ color }) => `${color}30`};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}%`};
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}%`};
  font-family: "Inter", sans-serif;
  border-radius: 4px;
  display: flex;
  border: 1px solid #ffffff;
`;

export const StyledStripe = styled.aside`
  background-color: ${({ color }) => color};
  height: 100%;
  width: 4px;
  border-radius: 4px 0 0 4px;
`;

export const StyledContentBar = styled.div`
  padding: 8px 12px;
  display: flex;
  gap: 8px;
  flex-direction: ${({ height }) => (height > 40 ? "column" : "row")};
`;
export const StyledTitle = styled.p`
  font-size: 15px;
  display: flex;
  align-items: center;
`;

export const StyledTime = styled.p`
  font-size: 12px;
  display: flex;
  align-items: center;
`;
