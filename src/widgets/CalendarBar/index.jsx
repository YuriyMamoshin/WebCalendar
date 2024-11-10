import ControlButton from "src/shared/ControlButton";
import {
  StyledBar,
  StyledCalendar,
  StyledControls,
  StyledHeader,
  StyledList,
  StyledTitle,
} from "./styled";
import Checkbox from "src/shared/UIkit/components/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addCalendar, editCalendar, deleteCalendar } from "./calendarsSlice";
import { useEffect, useRef, useState } from "react";
import Modal from "src/shared/UIkit/components/Modal";
import LineContainer from "src/shared/LineContainer";
import Input from "src/shared/UIkit/components/Input";
import ColorPicker from "src/shared/UIkit/components/ColorPicker";
import { COLOR_OPTIONS } from "src/shared/helpers";
import Button from "src/shared/UIkit/components/Button";
import ButtonsContainer from "src/shared/ButtonsContainer";

export default function CalendarBar() {
  const modalWidth = 294;

  const [currentCalendar, setCurrentCalendar] = useState({
    id: null,
    title: "",
    color: "",
    isOn: true,
  });

  const [creatingState, setCreatingState] = useState({
    isOpen: false,
    top: "",
    left: "",
  });

  const [editingState, setEditingState] = useState([]);

  const [deletingState, setDeletingState] = useState({
    isOpen: false,
    currentId: null,
    currentTitle: "",
  });

  const dispatch = useDispatch();
  const calendarsArray = useSelector((state) => state.calendars.calendars);

  const headerRef = useRef(null);
  const calendarsRefs = useRef([]);

  useEffect(() => {
    calendarsRefs.current.length = calendarsArray.length;
    setCreatingState((prev) => {
      return { ...prev, ...getCoords(headerRef.current) };
    });
    setEditingState(
      calendarsRefs.current.map((ref) => {
        return { isOpen: false, ...getCoords(ref) };
      })
    );
  }, [calendarsArray.length]);

  function getCoords(ref) {
    const rect = ref.getBoundingClientRect();
    const modalTop = `${rect.top + rect.height}px`;
    const modalLeft = `${rect.left + rect.width / 2 - modalWidth / 2}px`;
    return { top: modalTop, left: modalLeft };
  }

  function clearCurrentCalendar() {
    setCurrentCalendar({
      id: null,
      title: "",
      color: "",
      isOn: true,
    });
  }

  function clearDeletingState() {
    setDeletingState({
      isOpen: false,
      currentId: null,
      currentTitle: "",
    });
  }

  function handleStartCreating(event) {
    event.stopPropagation();
    setCurrentCalendar((prevCalendar) => {
      return { ...prevCalendar, id: new Date().getTime() };
    });
    setCreatingState((prev) => {
      return { ...prev, isOpen: true };
    });
  }

  function handleStartEditing(calendar, index, event) {
    event.stopPropagation();
    setCurrentCalendar({
      id: calendar.id,
      title: calendar.title,
      color: calendar.color,
      isOn: calendar.isOn,
    });
    setEditingState(
      editingState.map((modal, i) =>
        i === index ? { ...modal, isOpen: true } : modal
      )
    );
  }

  function startDeleting(id, title, event) {
    event.stopPropagation();
    setDeletingState({
      isOpen: true,
      currentId: id,
      currentTitle: title,
    });
  }

  function confirmDeleting() {
    dispatch(deleteCalendar(deletingState.currentId));
    clearDeletingState();
  }

  function cancelDeleting() {
    clearDeletingState();
  }

  function saveNewCalendar() {
    dispatch(addCalendar(currentCalendar));
    clearCurrentCalendar();
    setCreatingState((prev) => {
      return { ...prev, isOpen: false };
    });
  }

  function saveEditedCalendar(index) {
    dispatch(editCalendar(currentCalendar));
    clearCurrentCalendar();
    setEditingState(
      editingState.map((modal, i) =>
        i === index ? { ...modal, isOpen: false } : modal
      )
    );
  }

  const isCalendarDataFilled = currentCalendar.title && currentCalendar.color;

  return (
    <StyledBar>
      <StyledHeader ref={headerRef}>
        <p>My calendars</p>
        <ControlButton
          iconName="add"
          onClick={(event) => handleStartCreating(event)}
        />
      </StyledHeader>
      {creatingState.isOpen && (
        <Modal
          title="Create calendar"
          width={`${modalWidth}px`}
          left={creatingState.left}
          top={creatingState.top}
          setIsOpenFalse={() => {
            setCreatingState((prev) => {
              return { ...prev, isOpen: false };
            });
            clearCurrentCalendar();
          }}
        >
          <form method="dialog">
            <LineContainer icon="src/assets/icons/title.svg" height="40px">
              <Input
                label="Title"
                placeholder="Enter title"
                value={currentCalendar.title}
                onChange={(event) =>
                  setCurrentCalendar((prevCalendar) => {
                    return { ...prevCalendar, title: event.target.value };
                  })
                }
              />
            </LineContainer>
            <LineContainer icon="src/assets/icons/color.svg">
              <ColorPicker
                colors={COLOR_OPTIONS}
                label="color"
                chosenColor={currentCalendar.color}
                setChosenColor={(newColor) =>
                  setCurrentCalendar((prevCalendar) => {
                    return { ...prevCalendar, color: newColor };
                  })
                }
              />
            </LineContainer>
            <Button
              primary={true}
              label="Save"
              disabled={!isCalendarDataFilled}
              onClick={saveNewCalendar}
            />
          </form>
        </Modal>
      )}

      <StyledList>
        {calendarsArray.map((calendar, index) => {
          return (
            <>
              <StyledCalendar
                key={calendar.id}
                ref={(node) => (calendarsRefs.current[index] = node)}
              >
                <Checkbox
                  color={calendar.color}
                  isChecked={calendar.isOn}
                  setIsChecked={() =>
                    dispatch(
                      editCalendar({ ...calendar, isOn: !calendar.isOn })
                    )
                  }
                />
                <StyledTitle>{calendar.title}</StyledTitle>
                <StyledControls>
                  {calendar.id !== "default" && (
                    <ControlButton
                      iconName="trash"
                      onClick={(event) =>
                        startDeleting(calendar.id, calendar.title, event)
                      }
                    />
                  )}
                  <ControlButton
                    iconName="pen"
                    onClick={(event) =>
                      handleStartEditing(calendar, index, event)
                    }
                  />
                </StyledControls>
              </StyledCalendar>
              {editingState[index] && editingState[index].isOpen && (
                <Modal
                  title="Edit calendar"
                  width={`${modalWidth}px`}
                  top={editingState[index].top}
                  left={editingState[index].left}
                  setIsOpenFalse={() => {
                    setEditingState(
                      editingState.map((modal, i) =>
                        i === index ? { ...modal, isOpen: false } : modal
                      )
                    );
                    clearCurrentCalendar();
                  }}
                >
                  <form method="dialog">
                    <LineContainer
                      icon="src/assets/icons/title.svg"
                      height="40px"
                    >
                      <Input
                        label="Title"
                        placeholder="Enter title"
                        value={currentCalendar.title}
                        onChange={(event) =>
                          setCurrentCalendar((prevCalendar) => {
                            return {
                              ...prevCalendar,
                              title: event.target.value,
                            };
                          })
                        }
                      />
                    </LineContainer>
                    <LineContainer icon="src/assets/icons/color.svg">
                      <ColorPicker
                        colors={COLOR_OPTIONS}
                        label="color"
                        chosenColor={currentCalendar.color}
                        setChosenColor={(newColor) =>
                          setCurrentCalendar((prevCalendar) => {
                            return { ...prevCalendar, color: newColor };
                          })
                        }
                      />
                    </LineContainer>
                    <Button
                      primary={true}
                      label="Save"
                      onClick={saveEditedCalendar}
                    />
                  </form>
                </Modal>
              )}
            </>
          );
        })}
      </StyledList>

      {deletingState.isOpen && (
        <Modal width="522px" title="Delete calendar">
          <LineContainer>
            <p>{`Are you sure you want to delete ${deletingState.currentTitle}? You'll no longer have access to this calendar and its events.`}</p>
          </LineContainer>
          <ButtonsContainer>
            <Button label="Delete" primary={true} onClick={confirmDeleting} />
            <Button label="Cancel" onClick={cancelDeleting} />
          </ButtonsContainer>
        </Modal>
      )}
    </StyledBar>
  );
}
