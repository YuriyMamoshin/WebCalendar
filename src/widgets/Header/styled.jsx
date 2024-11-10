import styled from "styled-components";

export const StyledHeader = styled.header`
  grid-area: he;
  height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas: "main side";
  background-color: #ffffff;
`;

export const StyledTitleBox = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 60px;
`;

export const StyledDarkLogo = styled.img`
  z-index: 1;
`;

export const StyledLightLogo = styled.img`
  margin-left: -24px;
`;

export const StyledTitle = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 24px;
`;

export const StyledDate = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 17px;
`;
export const StyledMainContainer = styled.article`
  grid-area: main;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledRightContainer = styled.aside`
  grid-area: side;
  height: 36px;
  width: 300px;
  overflow: visible;
  z-index: 3;
  align-self: center;
`;
