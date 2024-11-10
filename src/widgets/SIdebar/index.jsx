import { StyledSidebar } from "src/widgets/SIdebar/styled";
import CalendarBar from "../CalendarBar";
import Button from "src/shared/UIkit/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleEvent, setEventType } from "src/app/appSlice";
import Datepicker from "src/shared/UIkit/components/Datepicker";
import { chooseDate } from "src/app/appSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.app.date);

  return (
    <StyledSidebar>
      <Button
        primary={true}
        width="240px"
        label="Create"
        withImage
        image="create"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(toggleEvent());
          dispatch(setEventType("new"));
        }}
      />

      <Datepicker
        dateState={currentDate}
        setDateState={(newDate) => dispatch(chooseDate(newDate))}
      />

      <CalendarBar />
    </StyledSidebar>
  );
}
