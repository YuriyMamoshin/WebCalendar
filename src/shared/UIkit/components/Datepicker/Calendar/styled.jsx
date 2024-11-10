import styled from "styled-components";

export const Button = styled.button`
  width: 16px;
  height: 16px;
  border: none;
  background: transparent
    url("src/shared/UIkit/assets/icons/${({ image }) => image}.svg")
    center/contain no-repeat;
`;

export const ButtonsContainer = styled.aside`
  width: 40px;
  display: flex;
  justify-content: space-between;
`;

export const CalendarContainer = styled.article`
  font-family: "Inter", sans-serif;
  padding: 14px 8px;
  width: 240px;
  height: 284px;
  font-size: 5px;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 4px 0 #0000001a;
  position: relative;
  background-color: #ffffff;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 8px;
`;

export const CalendarGrid = styled.section`
  display: grid;
  grid-template: repeat(7, auto) / repeat(7, auto);
  gap: 9px;
`;

export const CalendarHeaderDate = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #323749;
  text-align: center;
  user-select: none;
`;

export const CalendarCell = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  user-select: none;
`;

export const CalendarDay = styled(CalendarCell)`
  font-size: 12px;
  font-weight: 700;
  color: #323749;
`;

export const CalendarDate = styled(CalendarCell)`
  font-size: 12px;
  cursor: pointer;
  color: ${({ isSameMonth }) => (isSameMonth ? "#323749" : "#dddddd")};

  &:hover {
    color: black;
    background: #f6f6f6;
  }
`;

export const HighlightedCalendarDate = styled(CalendarDate)`
  color: #ffffff;
  background: #00ae1c;
  border-radius: 8px;

  &:hover {
    color: #ffffff;
    background: #00ae1c;
  }
`;

export const TodayCalendarDate = styled(HighlightedCalendarDate)`
  color: #00ae1c;
  background: transparent;
`;
