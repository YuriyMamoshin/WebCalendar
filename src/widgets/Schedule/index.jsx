import {
  StyledContainer,
  StyledDateContainer,
  StyledGridContainer,
  StyledHeader,
  StyledSchedule,
  StyledWeekContainer,
} from "src/widgets/Schedule/styled";
import Event from "src/widgets/Event";
import { useSelector, useDispatch } from "react-redux";
import { TIME_OPTIONS, daysArray } from "src/shared/helpers";
import ScheduleLine from "./ScheduleLine";
import EventBar from "./EventBar";
import { defineEventType, ONE_DAY_IN_MS } from "src/shared/helpers";
import {
  toggleEvent,
  setEventType,
  setEventId,
  setEventStartDay,
} from "src/app/appSlice";
import Toast from "src/shared/UIkit/components/Toast";
import DateBar from "./DateBar";

export default function Schedule() {
  const SCHEDULE_LINE_HEIGHT = 80;

  const events = useSelector((state) => state.schedule.events);
  const isEventOpen = useSelector((state) => state.app.event.isOpen);
  const eventType = useSelector((state) => state.app.event.type);
  const currentId = useSelector((state) => state.app.event.id);
  const currentDate = useSelector((state) => state.app.date);
  const calendars = useSelector((state) => state.calendars.calendars);
  const appMode = useSelector((state) => state.app.mode);

  const dispatch = useDispatch();

  function getWeekArray(currentDate) {
    const currentDay = new Date(currentDate).getDay();
    const weekStart = currentDate - currentDay * ONE_DAY_IN_MS;

    const weekArray = [];
    for (let i = 0; i < 7; i++) {
      weekArray.push(weekStart + i * ONE_DAY_IN_MS);
    }

    return weekArray;
  }

  function getDateContent(currentDate, dayIndex) {
    let sortedCurrentActiveEvents;

    const newEventsColumn = Array(49).fill(null);
    let eventsGrid = [newEventsColumn];

    if (events) {
      const currentEvents = events.flatMap((eventState) => {
        const startPoint = eventState.startTime.timeIndex;
        const endPoint = eventState.endTime.timeIndex;
        const isTwoDaysEvent = endPoint < startPoint;
        const isInFuture = eventState.date < currentDate;

        const eventType = defineEventType(eventState, currentDate);

        if (eventType === "everyday" && isInFuture) {
          if (isTwoDaysEvent) {
            return [
              {
                ...eventState,
                view: { start: 0, end: endPoint },
                startDay: "yesterday",
              },
              {
                ...eventState,
                view: { start: startPoint, end: 48 },
                startDay: "today",
              },
            ];
          } else {
            return {
              ...eventState,
              view: { start: startPoint, end: endPoint },
              startDay: "today",
            };
          }
        } else if (
          (eventType === "yesterday" ||
            eventType === "yesterdayWeekMatch" ||
            eventType === "yesterdayMonthMatch" ||
            eventType === "yesterdayYearMatch") &&
          isTwoDaysEvent
        ) {
          return {
            ...eventState,
            view: { start: 0, end: endPoint },
            startDay: "yesterday",
          };
        } else if (
          eventType === "today" ||
          eventType === "todayWeekMatch" ||
          eventType === "todayMonthMatch" ||
          eventType === "todayYearMatch"
        ) {
          if (isTwoDaysEvent) {
            return {
              ...eventState,
              view: { start: startPoint, end: 48 },
              startDay: "today",
            };
          } else {
            return {
              ...eventState,
              view: { start: startPoint, end: endPoint },
              startDay: "today",
            };
          }
        } else if (
          eventType === "yesterday" &&
          eventState.repeat.value === "Day"
        ) {
          return {
            ...eventState,
            view: { start: startPoint, end: endPoint },
            startDay: "today",
          };
        } else {
          return [];
        }
      });

      const currentActiveEvents = currentEvents.filter((eventState) => {
        const isCalendarOn = calendars.find(
          (calendar) => calendar.id === eventState.calendarId && calendar.isOn
        );
        return isCalendarOn;
      });

      sortedCurrentActiveEvents = currentActiveEvents.sort(
        (event1, event2) => event1.view.start - event2.view.start
      );

      for (let eventState of sortedCurrentActiveEvents) {
        const startIndex = eventState.view.start;
        const endIndex = eventState.view.end;

        function placeEventIntoGridColumn(column) {
          return column.map((cell, index) =>
            index < startIndex || index > endIndex - 1 ? cell : eventState.id
          );
        }

        let isPlaceForEventFound = false;

        const newGrid = eventsGrid.map((column) => {
          const columnPiece = column.slice(startIndex, endIndex + 1);
          const isColumnPieceEmpty = columnPiece.every((cell) => !cell);

          if (isColumnPieceEmpty && !isPlaceForEventFound) {
            isPlaceForEventFound = true;
            return placeEventIntoGridColumn(column);
          } else {
            return column;
          }
        });

        if (isPlaceForEventFound) {
          eventsGrid = newGrid;
        } else {
          eventsGrid.push(placeEventIntoGridColumn(newEventsColumn));
        }
      }
    }
    return (
      <StyledContainer
        height={SCHEDULE_LINE_HEIGHT * 24}
        index={dayIndex}
        mode={appMode.value}
      >
        {events &&
          sortedCurrentActiveEvents.map((eventState) => {
            const currentCalendar = calendars.find(
              (calendar) => calendar.id === eventState.calendarId
            );
            const startIndex = eventState.view.start;
            const endIndex = eventState.view.end;
            const columnsNumber = eventsGrid.length;
            const columPercentWidth = (1 / columnsNumber) * 100;

            function getGridRow(rowIndex, startFromColumn = 0) {
              const gridRow = [];
              for (let i = startFromColumn; i < eventsGrid.length; i++) {
                gridRow.push(eventsGrid[i][rowIndex]);
              }
              return gridRow;
            }

            const startingColumn = getGridRow(startIndex).findIndex(
              (cell) => cell === eventState.id
            );

            const eventBarLeft = startingColumn * columPercentWidth;

            let columnsSpan = 1;

            if (startingColumn !== eventsGrid.length - 1) {
              for (let i = startIndex + 1; i < endIndex; i++) {
                let newSpan;
                const minSpan = 1;
                const checkedRow = getGridRow(i, startingColumn + minSpan);

                const nextEventIndex = checkedRow.findIndex((cell) => !!cell);

                if (nextEventIndex === -1) {
                  newSpan = checkedRow.length + minSpan;
                } else {
                  newSpan = nextEventIndex + minSpan;
                }
                if (columnsSpan > newSpan) {
                  columnsSpan = newSpan;
                }
              }
            }

            const eventBarWidth = columnsSpan * columPercentWidth;
            const halfHourHeight = SCHEDULE_LINE_HEIGHT / 2;

            const eventBarTop = halfHourHeight * startIndex;
            const eventBarHeight = halfHourHeight * (endIndex - startIndex);

            return (
              <EventBar
                color={currentCalendar.color}
                title={eventState.title}
                time={`${eventState.startTime.value} - ${eventState.endTime.value}`}
                top={eventBarTop}
                left={eventBarLeft}
                height={eventBarHeight}
                width={eventBarWidth}
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(toggleEvent());
                  dispatch(setEventType("view"));
                  dispatch(setEventId(eventState.id));
                  dispatch(setEventStartDay(eventState.startDay));
                }}
              />
            );
          })}
      </StyledContainer>
    );
  }

  const scheduleGrid = TIME_OPTIONS.map((option, index) => {
    if (index !== 0 && index % 2 === 0) {
      return (
        <ScheduleLine key={option.timeIndex} height={SCHEDULE_LINE_HEIGHT}>
          {option.value}
        </ScheduleLine>
      );
    }
  });

  return (
    <StyledSchedule height={SCHEDULE_LINE_HEIGHT * 24}>
      <StyledHeader>
        {appMode.value === "Day" ? (
          <StyledDateContainer>
            <DateBar
              date={new Date(currentDate).getDate()}
              day={daysArray[new Date(currentDate).getDay()].short}
              active={true}
            />
          </StyledDateContainer>
        ) : (
          getWeekArray(currentDate).map((date) => {
            const dateObject = new Date(date);
            return (
              <StyledDateContainer>
                <DateBar
                  date={dateObject.getDate()}
                  day={daysArray[dateObject.getDay()].short}
                  active={date === currentDate}
                />
              </StyledDateContainer>
            );
          })
        )}
      </StyledHeader>
      <StyledGridContainer>{scheduleGrid}</StyledGridContainer>

      {appMode.value === "Day" ? (
        getDateContent(currentDate)
      ) : (
        <StyledWeekContainer>
          {getWeekArray(currentDate).map((day, index) =>
            getDateContent(day, index)
          )}
        </StyledWeekContainer>
      )}

      {isEventOpen &&
        (eventType === "new" ? (
          <Event />
        ) : (
          <Event initialState={events.find((item) => item.id === currentId)} />
        ))}
      <Toast message="Event deleted" duration={5} />
    </StyledSchedule>
  );
}
