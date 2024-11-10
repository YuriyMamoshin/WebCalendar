import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  toastId: null,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, action) => {
      state.events = state.events.map((event) => {
        return event.id === action.payload.id ? action.payload : event;
      });
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload.id);
    },

    setToastId: (state, action) => {
      state.toastId = action.payload;
    },
  },
});

export const { addEvent, editEvent, deleteEvent, setToastId } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
