import { StyledCalendarLine } from "./styled";

export default function CalendarLine({ color, title }) {
  return (
    <StyledCalendarLine color={color}>
      <div />
      <p>{title}</p>
    </StyledCalendarLine>
  );
}
