import {
  StyledEventBar,
  StyledStripe,
  StyledTime,
  StyledTitle,
  StyledContentBar,
} from "./styled";

export default function EventBar({ color, top, left, height, width, title, time, onClick }) {
  return (
    <StyledEventBar color={color} height={height} width={width} top={top} left={left} onClick={onClick}>
      <StyledStripe color={color} />
      <StyledContentBar height={height}>
        <StyledTitle>{title}</StyledTitle>
        <StyledTime>{time}</StyledTime>
      </StyledContentBar>
    </StyledEventBar>
  );
}
