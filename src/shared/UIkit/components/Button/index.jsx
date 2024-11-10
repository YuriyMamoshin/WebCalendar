import * as React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./styled";

export default function Button({
  primary,
  disabled,
  withImage,
  image,
  label,
  onClick,
  width,
  ...props
}) {
  return (
    <StyledButton
      withImage={withImage}
      primary={primary}
      disabled={disabled}
      onClick={onClick}
      width={width}
      {...props}
    >
      {withImage && <img src={`src/assets/icons/${image}.svg`} />}
      {label}
    </StyledButton>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  withImage: PropTypes.bool,
  image: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
};
