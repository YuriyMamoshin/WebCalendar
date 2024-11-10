import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import * as Styled from "./styled";
import calendar, {
  checkSameDay,
  checkSameMonth,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
} from "../helpers/calendar";

export default function Calendar({ initialDate, onDateChange }) {
  const [dateState, setDateState] = useState({
    current: new Date(),
    month: 0,
    year: 0,
  });

  const [today, setToday] = useState(new Date());

  useEffect(() => {
    addDateToState(initialDate);
  }, [initialDate]);

  function addDateToState(initialDate) {
    setDateState({
      current: initialDate,
      month: +initialDate.getMonth() + 1,
      year: initialDate.getFullYear(),
    });
  }

  function getCalendarDates() {
    const { current, month, year } = dateState;

    const calendarMonth = month || +current?.getMonth() + 1;
    const calendarYear = year || current?.getFullYear();
    return calendar(calendarMonth, calendarYear);
  }

  function renderMonthAndYear() {
    const { month, year } = dateState;

    const monthname =
      Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];

    const headerDate = `${monthname} ${year}`;

    return (
      <Styled.CalendarHeader>
        <Styled.CalendarHeaderDate>{headerDate}</Styled.CalendarHeaderDate>
        <Styled.ButtonsContainer>
          <Styled.Button onClick={() => gotoPreviousMonth()} image="left" />
          <Styled.Button onClick={() => gotoNextMonth()} image="right" />
        </Styled.ButtonsContainer>
      </Styled.CalendarHeader>
    );
  }

  function renderDayLabel(day) {
    const daylabel = WEEK_DAYS[day];
    return <Styled.CalendarDay key={day}>{daylabel}</Styled.CalendarDay>;
  }

  function renderCalendarDate(calendarDate) {
    const { current, month, year } = dateState;
    const newdate = new Date(calendarDate.join("-"));

    const isToday = checkSameDay(newdate, today);
    const isCurrent = current && checkSameDay(newdate, current);
    const isSameMonth =
      month &&
      year &&
      checkSameMonth(newdate, new Date([year, month, 1].join("-")));
    const onClick = gotoDate(newdate);

    const DateComponent = isCurrent
      ? Styled.HighlightedCalendarDate
      : isToday
      ? Styled.TodayCalendarDate
      : Styled.CalendarDate;

    return (
      <DateComponent key={newdate} isSameMonth={isSameMonth} onClick={onClick}>
        {newdate.getDate()}
      </DateComponent>
    );
  }

  function gotoDate(initialDate) {
    return (event) => {
      event && event.preventDefault();
      const { current } = dateState;
      if (!(current && checkSameDay(initialDate, current))) {
        addDateToState(initialDate);
        onDateChange(initialDate);
      }
    };
  }

  function gotoPreviousMonth() {
    const { month, year } = dateState;
    const previousMonth = getPreviousMonth(month, year);
    setDateState({
      month: previousMonth.month,
      year: previousMonth.year,
      current: dateState.current,
    });
  }

  function gotoNextMonth() {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState({
      month: nextMonth.month,
      year: nextMonth.year,
      current: dateState.current,
    });
  }

  return (
    <Styled.CalendarContainer data-testid="dropdown">
      {renderMonthAndYear()}
      <Styled.CalendarGrid>
        <>{Object.keys(WEEK_DAYS).map(renderDayLabel)}</>
        <>{getCalendarDates().map(renderCalendarDate)}</>
      </Styled.CalendarGrid>
    </Styled.CalendarContainer>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
};
