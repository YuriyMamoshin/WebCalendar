import { configureStore } from "@reduxjs/toolkit";

import calendarsReducer from "src/widgets/CalendarBar/calendarsSlice";
import appReducer from "src/app/appSlice";
import scheduleReducer from "src/widgets/Schedule/scheduleSlice";

export const store = configureStore({
  reducer: {
    calendars: calendarsReducer,
    app: appReducer,
    schedule: scheduleReducer,
  },
});
