import { StyledDate, StyledDateBar, StyledDay } from "./styled";

export default function DateBar({ date, day, active }) {
  return (
    <StyledDateBar active={active}>
      <StyledDate>{date}</StyledDate>
      <StyledDay>{day}</StyledDay>
    </StyledDateBar>
  );
}
