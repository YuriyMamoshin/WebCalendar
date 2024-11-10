import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendars: [
    {
      id: "default",
      title: "default",
      color: "#9F2957",
      isOn: true,
    },
  ],
};

export const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {
    addCalendar: (state, action) => {
      state.calendars.push(action.payload);
    },
    editCalendar: (state, action) => {
      state.calendars = state.calendars.map((calendar) =>
        calendar.id === action.payload.id ? action.payload : calendar
      );
    },
    deleteCalendar: (state, action) => {
      state.calendars = state.calendars.filter(
        (calendar) => calendar.id !== action.payload
      );
    },
  },
});

export const { addCalendar, editCalendar, deleteCalendar } =
  calendarsSlice.actions;

export default calendarsSlice.reducer;
