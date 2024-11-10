import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { StyledDropdown, StyledItem } from "./styled";
import PropTypes from "prop-types";

export default function Dropdown({
  items,
  placeholder,
  selectedItem,
  setSelectedItem,
}) {
  const [isMenuShown, setIsMenuShown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function clickHandler(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuShown(false);
      }
    }

    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  function toggleMenu() {
    setIsMenuShown(!isMenuShown);
  }

  function handleSelectedItem(item) {
    setSelectedItem(item);
    toggleMenu();
  }

  const dropdownItems = items.map((item) => {
    return (
      <StyledItem
        key={item.value}
        onClick={() => handleSelectedItem(item)}
        isSelected={selectedItem?.value === item.value}
      >
        {item.label}
      </StyledItem>
    );
  });

  return (
    <StyledDropdown ref={dropdownRef} isMenuShown={isMenuShown}>
      <header onClick={toggleMenu} data-testid="dropdown-toggle">
        <p data-testid="output">
          {selectedItem ? selectedItem.label : placeholder}
        </p>
        <img
          src="src/shared/UIkit/assets/icons/down.svg"
          alt="Open dropdown menu"
        />
      </header>
      {isMenuShown && (
        <main data-testid="dropdown">
          <ul>{dropdownItems}</ul>
        </main>
      )}
    </StyledDropdown>
  );
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};
