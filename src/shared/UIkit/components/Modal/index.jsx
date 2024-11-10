import * as React from "react";
import {
  StyledModal,
  StyledHeader,
  StyledTitle,
  StyledContentBar,
  StyledButtonsContainer,
  StyledCloseButton,
} from "./styled";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

export default function Modal({
  title,
  children,
  width,
  top,
  left,
  setIsOpenFalse,
  editButton,
  deleteButton,
}) {
  const modalRef = useRef(null);

  function clickHandler(event) {
    if (modalRef.current) {
      const dialogRect = modalRef.current.getBoundingClientRect();
      const isClickInside =
        dialogRect.top <= event.clientY &&
        event.clientY <= dialogRect.top + dialogRect.height &&
        dialogRect.left <= event.clientX &&
        event.clientX <= dialogRect.left + dialogRect.width;

      if (!isClickInside) {
        handleClosing();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  useEffect(() => {
    modalRef.current.showModal();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleClosing();
    }
  };

  function handleClosing() {
    modalRef.current.close();
    setIsOpenFalse();
  }

  return (
    <StyledModal
      ref={modalRef}
      onKeyDown={handleKeyDown}
      width={width}
      top={top}
      left={left}
      data-testid="dialog"
    >
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledButtonsContainer>
          {editButton && editButton}
          {deleteButton && deleteButton}
          <StyledCloseButton
            onClick={() => handleClosing()}
            data-testid="close-button"
          />
        </StyledButtonsContainer>
      </StyledHeader>
      <StyledContentBar>{children}</StyledContentBar>
    </StyledModal>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  setIsOpenFalse: PropTypes.func,
  editButton: PropTypes.element,
  deleteButton: PropTypes.element,
};
