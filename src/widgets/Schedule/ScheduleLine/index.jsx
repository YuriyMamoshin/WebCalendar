import { StyledEventsBox, StyledScheduleLine, StyledTimeBox } from "./styled";

export default function ScheduleLine({ children, height }) {
  return (
    <StyledScheduleLine height={height}>
      <StyledTimeBox>{children}</StyledTimeBox>
      <StyledEventsBox />
    </StyledScheduleLine>
  );
}
