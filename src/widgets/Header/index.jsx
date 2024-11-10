import Button from "src/shared/UIkit/components/Button";
import {
  StyledDarkLogo,
  StyledDate,
  StyledHeader,
  StyledLightLogo,
  StyledMainContainer,
  StyledRightContainer,
  StyledTitle,
  StyledTitleBox,
} from "src/widgets/Header/styled";
import { useDispatch, useSelector } from "react-redux";
import { CALENDAR_MONTHS } from "src/shared/helpers";
import { chooseDate, chooseMode } from "src/app/appSlice";
import Dropdown from "src/shared/UIkit/components/Dropdown";

export default function Header() {
  const dispatch = useDispatch();

  const chosenDateTimestamp = useSelector((state) => state.app.date);
  const currentMode = useSelector((state) => state.app.mode);
  const chosenDate = new Date(chosenDateTimestamp);
  const DAY_MILLISECONDS = 864e5;

  return (
    <StyledHeader>
      <StyledMainContainer>
        <StyledTitleBox>
          <StyledDarkLogo src="src/assets/icons/logo-rect-dark.svg" />
          <StyledLightLogo src="src/assets/icons/logo-rect-light.svg" />
          <StyledTitle>WebCalendar</StyledTitle>
        </StyledTitleBox>
        <Button
          label="Today"
          width="60px"
          primary
          onClick={() => dispatch(chooseDate(new Date().getTime()))}
        />
        <Button
          withImage
          image="arrow-left"
          width="36px"
          onClick={() =>
            dispatch(
              chooseDate(chosenDate.setYear(chosenDate.getFullYear() - 1))
            )
          }
        />
        <Button
          withImage
          image="double-arrow-left-icon"
          width="36px"
          onClick={() =>
            dispatch(chooseDate(chosenDate.setMonth(chosenDate.getMonth() - 1)))
          }
        />
        <Button
          withImage
          image="arrow-left"
          width="36px"
          onClick={() =>
            dispatch(chooseDate(chosenDate.getTime() - DAY_MILLISECONDS))
          }
        />
        <Button
          withImage
          image="arrow-right"
          width="36px"
          onClick={() =>
            dispatch(chooseDate(chosenDate.getTime() + DAY_MILLISECONDS))
          }
        />
        <Button
          withImage
          image="double-arrow-right-icon"
          width="36px"
          onClick={() =>
            dispatch(chooseDate(chosenDate.setMonth(chosenDate.getMonth() + 1)))
          }
        />
        <Button
          withImage
          image="arrow-right"
          width="36px"
          onClick={() =>
            dispatch(
              chooseDate(chosenDate.setYear(chosenDate.getFullYear() + 1))
            )
          }
        />
        <StyledDate>
          {`${
            Object.keys(CALENDAR_MONTHS)[chosenDate.getMonth()]
          } ${chosenDate.getDate()}, ${chosenDate.getFullYear()}`}{" "}
        </StyledDate>
      </StyledMainContainer>

      <StyledRightContainer>
        <Dropdown
          items={[
            { label: "Day", value: "Day" },
            { label: "Week", value: "Week" },
          ]}
          selectedItem={currentMode}
          setSelectedItem={(item) => dispatch(chooseMode(item))}
        />
      </StyledRightContainer>
    </StyledHeader>
  );
}
