import styled from "styled-components";

export const StyledBar = styled.section`
  width: 240px;
  border-radius: 8px;
  box-shadow: 0 4px 4px 0 #00000019;
  background-color: #ffffff;
  padding: 13px 8px 16px;
`;

export const StyledHeader = styled.header`
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

export const StyledList = styled.ul``;

export const StyledCalendar = styled.li`
height: 30px;
border: 3px solid white;
  display: grid;
  grid-template-columns: 32px 1fr 56px;
  align-items: center;
  justify-items: center;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  margin: 16px 0;
  border-radius: 8px;

  &:hover {
  background-color: #F6F7F8;
    & aside {
      display: flex;
    }
  }
`;

export const StyledControls = styled.aside`
  width: 56px;
  display: none;
  align-items: center;
  justify-content: space-evenly;
`;

export const StyledTitle = styled.div`
  justify-self: start;
`;
