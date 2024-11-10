import { StyledControlButton } from "./styled";

export default function ControlButton({ iconName, onClick }) {
  return <StyledControlButton iconName={iconName} onClick={onClick} />;
}
