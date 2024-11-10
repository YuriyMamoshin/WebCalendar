import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { StyledSelect, StyledOption } from "./styled";
import PropTypes from "prop-types";
import Input from "../Input";

export default function Select({
  label,
  options,
  placeholder,
  optionState,
  setOptionState,
  width,
  withImage,
  zIndex,
}) {
  const [isMenuShown, setIsMenuShown] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    function clickHandler(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsMenuShown(false);
      }
    }

    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  function toggleMenu() {
    setIsMenuShown(!isMenuShown);
  }

  function handleSelectedOption(option) {
    setOptionState(option);
    toggleMenu();
  }

  const optionsContent = options.map((option, index) => {
    return (
      <StyledOption
        key={index}
        onClick={() => handleSelectedOption(option)}
        isSelected={optionState?.value === option.value}
      >
        {option.content ? option.content : option.label}
      </StyledOption>
    );
  });

  return (
    <StyledSelect ref={selectRef} width={width} zIndex={zIndex}>
      <header onClick={toggleMenu} data-testid="dropdown-toggle">
        <Input
          label={label}
          value={optionState ? optionState.label : placeholder}
          width={width}
          data-testid="output"
        />
        {optionState?.content && optionState.content}
        {withImage && (
          <img src="src/shared/UIkit/assets/icons/select.svg" alt="" />
        )}
      </header>
      {isMenuShown && (
        <main data-testid="dropdown">
          <ul>{optionsContent}</ul>
        </main>
      )}
    </StyledSelect>
  );
}

Select.propTypes = {
  content: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  optionState: PropTypes.object,
  setOptionState: PropTypes.func,
  width: PropTypes.string,
  withImage: PropTypes.bool,
  zIndex: PropTypes.number,
};
