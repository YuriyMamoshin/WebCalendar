import {
  StyledIcon,
  StyledContentContainer,
  StyledLineContainer,
} from "./styled";

export default function LineContainer({ icon, height, children }) {
  return (
    <StyledLineContainer height={height}>
      {icon && <StyledIcon src={icon} />}
      <StyledContentContainer icon={icon}>{children}</StyledContentContainer>
    </StyledLineContainer>
  );
}
