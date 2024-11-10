import Datepicker from "src/shared/UIkit/components/Datepicker";
import { useDispatch, useSelector } from "react-redux";

import Modal from "src/shared/UIkit/components/Modal";
import {
  TIME_OPTIONS,
  autopickStartTime,
  autopickEndTime,
  daysArray,
  CALENDAR_MONTHS,
  ONE_DAY_IN_MS,
  defineEventType,
} from "src/shared/helpers";
import Select from "src/shared/UIkit/components/Select";
import { useEffect, useState } from "react";
import LineContainer from "src/shared/LineContainer";
import Input from "src/shared/UIkit/components/Input";
import Textarea from "src/shared/UIkit/components/Textarea";
import { toggleEvent, setEventType } from "src/app/appSlice";
import CalendarLine from "./CalendarLine";
import ButtonsContainer from "src/shared/ButtonsContainer";
import Button from "src/shared/UIkit/components/Button";
import { addEvent, editEvent, deleteEvent } from "../Schedule/scheduleSlice";
import { showDate } from "src/shared/UIkit/components/Datepicker/helpers/calendar";
import ControlButton from "src/shared/ControlButton";

import { setToastId } from "../Schedule/scheduleSlice";
import { StyledEvent } from "./styled";

export default function Event({ initialState }) {
  const MODAL_WIDTH = 522;

  const dispatch = useDispatch();

  const eventType = useSelector((state) => state.app.event.type);
  const calendarsArray = useSelector((state) => state.calendars.calendars);
  const defaultDate = useSelector((state) => state.app.date);
  const currentDate = useSelector((state) => state.app.date);
  const startDay = useSelector((state) => state.app.event.startDay);
  const calendarsContent = calendarsArray.map((item) => {
    return {
      content: <CalendarLine color={item.color} title={item.title} />,
      value: item.id,
    };
  });

  const [chosenCalendar, setChosenCalendar] = useState(
    initialState
      ? calendarsContent.find((item) => item.value === initialState.calendarId)
      : calendarsContent[0]
  );

  const [eventState, setEventState] = useState(
    initialState
      ? { ...initialState, date: determineDate() }
      : {
          id: null,
          title: "",
          date: null,
          startTime: null,
          endTime: null,
          calendarId: chosenCalendar.value,
          description: "",
          repeat: null,
        }
  );

  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false);

  function determineDate() {
    const eventType = defineEventType(initialState, currentDate);

    if (eventType === "everyday") {
      if (startDay === "yesterday") return currentDate - ONE_DAY_IN_MS;
      if (startDay === "today") return currentDate;
    } else if (
      eventType === "todayWeekMatch" ||
      eventType === "todayWeekMatch" ||
      eventType === "todayMonthMatch" ||
      eventType === "todayYearMatch"
    ) {
      return currentDate;
    } else if (
      eventType === "yesterdayWeekMatch" ||
      eventType === "yesterdayWeekMatch" ||
      eventType === "yesterdayMonthMatch" ||
      eventType === "yesterdayYearMatch"
    ) {
      return currentDate - ONE_DAY_IN_MS;
    } else if (eventType === "today" || eventType === "yesterday") {
      return initialState.date;
    }
  }

  function getRepeatOptions(date = new Date().getTime()) {
    const dateObject = new Date(date);
    console.log(eventState);
    return [
      {
        label: "Does not repeat",
        value: "Not",
      },
      {
        label: "Daily",
        value: "Day",
      },
      {
        label: `Weekly on ${daysArray[dateObject.getDay()].full}s`,
        value: "Week",
      },
      {
        label: "Monthly",
        value: "Month",
      },
      {
        label: `Annually on ${
          Object.keys(CALENDAR_MONTHS)[dateObject.getMonth()]
        } ${dateObject.getDate()}`,
        value: "Year",
      },
    ];
  }

  useEffect(
    () => handleChange("calendarId", chosenCalendar.value),
    [chosenCalendar]
  );

  useEffect(() => {
    if (!initialState) autofillNewEvent();
  }, []);

  const isTitleEmpty = !eventState.title;

  function autofillNewEvent() {
    const currentTimestamp = defaultDate;
    const startTime = autopickStartTime(currentTimestamp);
    const endTime = autopickEndTime(startTime);

    handleChange("id", new Date().getTime());
    handleChange("date", currentTimestamp);
    handleChange("startTime", startTime);
    handleChange("endTime", endTime);
    handleChange("repeat", getRepeatOptions()[0]);
  }

  function handleChange(property, value) {
    setEventState((prevEventState) => {
      return { ...prevEventState, [property]: value };
    });
  }

  function saveEvent() {
    dispatch(
      eventType === "new" ? addEvent(eventState) : editEvent(eventState)
    );
    dispatch(toggleEvent());
    dispatch(setEventType(""));
  }

  function handleDeleteEvent() {
    dispatch(deleteEvent(eventState));
    dispatch(toggleEvent());
    dispatch(setEventType(""));
  }

  function determineTitle(eventType) {
    switch (eventType) {
      case "new":
        return "Create event";

      case "edit":
        return "Edit event";

      case "view":
        return "Event information";
    }
  }

  return (
    <StyledEvent>
      <Modal
        title={determineTitle(eventType)}
        width={`${MODAL_WIDTH}px`}
        setIsOpenFalse={() => {
          dispatch(toggleEvent());
          dispatch(setEventType(""));
        }}
        editButton={
          eventType === "view" ? (
            <ControlButton
              iconName="pen"
              onClick={() => dispatch(setEventType("edit"))}
            />
          ) : null
        }
        deleteButton={
          eventType === "view" ? (
            <ControlButton
              iconName="trash"
              onClick={(event) => {
                event.stopPropagation();
                setIsDeleteMessageOpen(true);
              }}
            />
          ) : null
        }
      >
        <LineContainer icon="src/assets/icons/title.svg" height="40px">
          {eventType === "view" ? (
            <div>{eventState.title}</div>
          ) : (
            <Input
              label="Title"
              placeholder="Enter title"
              value={eventState.title}
              onChange={(event) => handleChange("title", event.target.value)}
              width="456px"
            />
          )}
        </LineContainer>

        <LineContainer icon="src/assets/icons/clock.svg" height="40px">
          {eventType === "view" ? (
            <>
              <div>{showDate(new Date(eventState.date))}</div>
              <div>{eventState.startTime && eventState.startTime.value}</div>
              <img src="src/assets/icons/divider.svg" />
              <div>{eventState.endTime && eventState.endTime.value}</div>
            </>
          ) : (
            <>
              <Datepicker
                droppable={true}
                dateState={eventState.date}
                setDateState={(newDate) => handleChange("date", newDate)}
                width="240px"
                zIndex={3}
              />
              <Select
                label="Start"
                options={TIME_OPTIONS}
                optionState={eventState.startTime}
                setOptionState={(newStartTime) =>
                  handleChange("startTime", newStartTime)
                }
                placeholder="start"
                width="88px"
                zIndex={3}
              />
              <img src="src/assets/icons/divider.svg" />
              <Select
                label="End"
                options={TIME_OPTIONS}
                optionState={eventState.endTime}
                setOptionState={(newEndTime) =>
                  handleChange("endTime", newEndTime)
                }
                placeholder="end"
                width="88px"
                zIndex={3}
              />
            </>
          )}
        </LineContainer>

        {eventType !== "view" && (
          <LineContainer>
            <Select
              options={getRepeatOptions(eventState.date)}
              optionState={eventState.repeat}
              setOptionState={(newOption) => handleChange("repeat", newOption)}
              width="202px"
              zIndex={2}
              withImage
            />
          </LineContainer>
        )}

        <LineContainer icon="src/assets/icons/calendar.svg">
          {eventType === "view" ? (
            <div>{chosenCalendar.content}</div>
          ) : (
            <Select
              label="Calendar"
              options={calendarsContent}
              optionState={chosenCalendar}
              setOptionState={(newItem) => setChosenCalendar(newItem)}
              width="456px"
              withImage
            />
          )}
        </LineContainer>

        <LineContainer icon="src/assets/icons/text.svg">
          {eventType === "view" ? (
            <div>{eventState.description}</div>
          ) : (
            <Textarea
              label="Description"
              textareaState={eventState.description}
              setTextAreaState={(newText) =>
                handleChange("description", newText)
              }
            />
          )}
        </LineContainer>

        {eventType !== "view" && (
          <ButtonsContainer>
            <Button
              primary
              label="Save"
              width="80px"
              disabled={isTitleEmpty}
              onClick={saveEvent}
            />
          </ButtonsContainer>
        )}
      </Modal>

      {isDeleteMessageOpen && (
        <Modal
          width="522px"
          title="Delete event"
          setIsOpenFalse={() => setIsDeleteMessageOpen(false)}
        >
          <LineContainer>
            <p>{`Are you sure you want to delete ${eventState.title}? You'll no longer have access to it.`}</p>
          </LineContainer>
          <ButtonsContainer>
            <Button
              label="Delete"
              primary={true}
              onClick={() => {
                handleDeleteEvent();
                setIsDeleteMessageOpen(false);
                dispatch(setToastId(new Date().getTime()));
              }}
            />
            <Button
              label="Cancel"
              onClick={() => setIsDeleteMessageOpen(false)}
            />
          </ButtonsContainer>
        </Modal>
      )}
    </StyledEvent>
  );
}
