import styled from "styled-components";

export const StyledLineContainer = styled.li`
  display: flex;
  height: ${({ height }) => (height ? height : "auto")};
  margin-bottom: 24px;
`;

export const StyledIcon = styled.img`
  display: block;
  margin-top: 16px;
  margin-right: 18px;
  align-self: flex-start;
`;

export const StyledContentContainer = styled.main`
  display: flex;
  column-gap: 16px;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${({ icon }) => (icon ? 0 : "34px")}; 
  
  & img {
    margin: 0 -8px;
  }
`;
