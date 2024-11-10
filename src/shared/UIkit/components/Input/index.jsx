import * as React from "react";
import PropTypes from "prop-types";
import { StyledInput } from "./styled";
import { useState } from "react";

export default function Input({
  error,
  errorMessage,
  type,
  placeholder,
  disabled,
  value,
  label,
  name,
  width,
  ...props
}) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <StyledInput error={error} width={width}>
      <label data-testid="label">{label}</label>
      <input
        type={isPassword ? "text" : type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        name={name}
        data-testid="input"
        {...props}
      />
      {type === "password" && (
        <img
          src={`src/assets/icons/${isPassword ? "shown" : "hidden"}.svg`}
          alt={`${isPassword ? "Hide" : "Show"} password`}
          onClick={() => setIsPassword(!isPassword)}
        />
      )}
      {error && <p data-testid="error">{errorMessage}</p>}
    </StyledInput>
  );
}

Input.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.string,
};
