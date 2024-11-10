import * as React from "react";
import { StyledTextarea } from "./styled";
import { useRef,  useEffect } from "react";
import PropTypes from "prop-types";

export default function Textarea({
  label,
  placeholder,
  textareaState,
  setTextAreaState,
}) {
  const textAreaRef = useRef(null);

  const textAreaElement = textAreaRef.current;

  useEffect(() => {
    if (textAreaElement) {
      textAreaElement.style.height = "0px";
      const scrollHeight = textAreaElement.scrollHeight;

      textAreaElement.style.height = scrollHeight + "px";
    }
  }, [textAreaElement, textareaState]);

  function onChangeHandler(event) {
    setTextAreaState(event.target.value);
  }

  return (
    <StyledTextarea>
      <label data-testid="label">{label}</label>

      <textarea
        ref={textAreaRef}
        rows={1}
        onChange={onChangeHandler}
        value={textareaState}
        placeholder={placeholder}
        data-testid="textarea"
      />
    </StyledTextarea>
  );
}

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
