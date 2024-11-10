import * as React from "react";
import PropTypes from "prop-types";
import { StyledColorPicker, StyledColor } from "./styled";

export default function ColorPicker({
  colors,
  label,
  chosenColor,
  setChosenColor,
}) {
  const gridColumns = Math.floor(colors.length / 2);

  const colorsContent = colors.map((color) => (
    <StyledColor backgroundColor={color} checked={chosenColor === color}>
      <input
        type="radio"
        checked={chosenColor === color}
        value={color}
        onChange={() => setChosenColor(color)}
      />
      <div></div>
    </StyledColor>
  ));

  return (
    <StyledColorPicker columns={gridColumns} data-testid="color-picker">
      <label>{label}</label>
      <section>{colorsContent}</section>
    </StyledColorPicker>
  );
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.number,
  chosenColor: PropTypes.string,
  setChosenColor: PropTypes.func,
};
