import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Calendar from "./Calendar";
import { StyledWrapper } from "./styled";
import PropTypes from "prop-types";
import { showDate } from "./helpers/calendar";
import Input from "../Input";

export default function Datepicker({
  droppable,
  dateState,
  setDateState,
  width,
  zIndex,
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const datepickerRef = useRef(null);

  useEffect(() => {
    function clickHandler(event) {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target)
      ) {
        setCalendarOpen(false);
      }
    }

    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, []);

  function toggleCalendar() {
    setCalendarOpen(!calendarOpen);
  }

  function handleChange(event) {
    event.preventDefault();
  }

  function handleDateChange(date) {
    setDateState(date.getTime());
    if (droppable) setCalendarOpen(false);
  }

  return (
    <StyledWrapper ref={datepickerRef} zIndex={zIndex} droppable={droppable}>
      {droppable && (
        <Input
          type="text"
          label="Date"
          value={dateState ? showDate(new Date(dateState)) : ""}
          onChange={handleChange}
          readOnly="readonly"
          onClick={toggleCalendar}
          width={width}
          data-testid="dropdown-toggle"
        />
      )}

      {(!droppable || calendarOpen) && (
        <Calendar
          initialDate={dateState && new Date(dateState)}
          onDateChange={handleDateChange}
        />
      )}
    </StyledWrapper>
  );
}

Datepicker.propTypes = {
  input: PropTypes.bool,
  dateState: PropTypes.number,
  setDateState: PropTypes.func,
  width: PropTypes.string,
  zIndex: PropTypes.number,
};
