import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: { isOpen: false, type: "", id: null, startDay: "" },
  date: new Date().getTime(),
  mode: { label: "Day", value: "Day" },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleEvent: (state) => {
      state.event.isOpen = !state.event.isOpen;
    },
    setEventType: (state, action) => {
      state.event.type = action.payload;
    },
    setEventId: (state, action) => {
      state.event.id = action.payload;
    },
    setEventStartDay: (state, action) => {
      state.event.startDay = action.payload;
    },
    chooseDate: (state, action) => {
      state.date = action.payload;
    },
    chooseMode: (state, action) => {
      state.mode = action.payload;
    },
    
  },
});

export const { toggleEvent, setEventType, setEventId, setEventStartDay, chooseDate, chooseMode } =
  appSlice.actions;

export default appSlice.reducer;
