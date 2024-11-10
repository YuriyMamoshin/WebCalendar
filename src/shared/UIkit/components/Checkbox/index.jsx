import * as React from "react";
import PropTypes from "prop-types";
import { StyledCheckbox } from "./styled";
import Checkmark from "./Checkmark";
import UncheckedBox from "./UncheckedBox";

export default function Checkbox({ label, color, isChecked, setIsChecked }) {
  return (
    <StyledCheckbox label={label}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={setIsChecked} />
        {isChecked ? (
          <Checkmark color={color} />
        ) : (
          <UncheckedBox color={color} />
        )}

        {label && <span data-testid="label">{label}</span>}
      </label>
    </StyledCheckbox>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
};
