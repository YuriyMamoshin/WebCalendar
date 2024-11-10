export const TIME_OPTIONS = [
  { label: "00:00", value: "00:00", timeIndex: 0 },
  { label: "00:30", value: "00:30", timeIndex: 1 },
  { label: "01:00", value: "01:00", timeIndex: 2 },
  { label: "01:30", value: "01:30", timeIndex: 3 },
  { label: "02:00", value: "02:00", timeIndex: 4 },
  { label: "02:30", value: "02:30", timeIndex: 5 },
  { label: "03:00", value: "03:00", timeIndex: 6 },
  { label: "03:30", value: "03:30", timeIndex: 7 },
  { label: "04:00", value: "04:00", timeIndex: 8 },
  { label: "04:30", value: "04:30", timeIndex: 9 },
  { label: "05:00", value: "05:00", timeIndex: 10 },
  { label: "05:30", value: "05:30", timeIndex: 11 },
  { label: "06:00", value: "06:00", timeIndex: 12 },
  { label: "06:30", value: "06:30", timeIndex: 13 },
  { label: "07:00", value: "07:00", timeIndex: 14 },
  { label: "07:30", value: "07:30", timeIndex: 15 },
  { label: "08:00", value: "08:00", timeIndex: 16 },
  { label: "08:30", value: "08:30", timeIndex: 17 },
  { label: "09:00", value: "09:00", timeIndex: 18 },
  { label: "09:30", value: "09:30", timeIndex: 19 },
  { label: "10:00", value: "10:00", timeIndex: 20 },
  { label: "10:30", value: "10:30", timeIndex: 21 },
  { label: "11:00", value: "11:00", timeIndex: 22 },
  { label: "11:30", value: "11:30", timeIndex: 23 },
  { label: "12:00", value: "12:00", timeIndex: 24 },
  { label: "12:30", value: "12:30", timeIndex: 25 },
  { label: "13:00", value: "13:00", timeIndex: 26 },
  { label: "13:30", value: "13:30", timeIndex: 27 },
  { label: "14:00", value: "14:00", timeIndex: 28 },
  { label: "14:30", value: "14:30", timeIndex: 29 },
  { label: "15:00", value: "15:00", timeIndex: 30 },
  { label: "15:30", value: "15:30", timeIndex: 31 },
  { label: "16:00", value: "16:00", timeIndex: 32 },
  { label: "16:30", value: "16:30", timeIndex: 33 },
  { label: "17:00", value: "17:00", timeIndex: 34 },
  { label: "17:30", value: "17:30", timeIndex: 35 },
  { label: "18:00", value: "18:00", timeIndex: 36 },
  { label: "18:30", value: "18:30", timeIndex: 37 },
  { label: "19:00", value: "19:00", timeIndex: 38 },
  { label: "19:30", value: "19:30", timeIndex: 39 },
  { label: "20:00", value: "20:00", timeIndex: 40 },
  { label: "20:30", value: "20:30", timeIndex: 41 },
  { label: "21:00", value: "21:00", timeIndex: 42 },
  { label: "21:30", value: "21:30", timeIndex: 43 },
  { label: "22:00", value: "22:00", timeIndex: 44 },
  { label: "22:30", value: "22:30", timeIndex: 45 },
  { label: "23:00", value: "23:00", timeIndex: 46 },
  { label: "23:30", value: "23:30", timeIndex: 47 },
  { label: "00:00", value: "00:00", timeIndex: 48 },
];

export const COLOR_OPTIONS = [
  "#9F2957",
  "#D90056",
  "#E25D33",
  "#DFC45A",
  "#B8C42F",
  "#16AF6E",
  "#429488",
  "#397E49",
  "#439BDF",
  "#4254AF",
  "#6C7AC4",
  "#8332A4",
];

export const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export function autopickStartTime(timestamp) {
  const date = new Date(timestamp);
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();
  let timeString;

  if (currentMinute < 29) {
    timeString = `${currentHour}:30`;
  } else if (currentHour === 23) {
    timeString = `00:00`;
  } else {
    timeString = `${currentHour + 1}:00`;
  }

  if (timeString.length < 5) timeString = timeString.padStart(5, "0");

  return TIME_OPTIONS.find((item) => item.value === timeString);
}

export function autopickEndTime(startTimeObj) {
  const startTimeIndex = TIME_OPTIONS.findIndex(
    (item) => item.value === startTimeObj.value
  );

  return TIME_OPTIONS[startTimeIndex + 1];
}

export function getDateString(timestamp) {
  const dateObj = new Date(timestamp);
  const monthString = `${dateObj.getMonth() + 1}`.padStart(2, "0");
  const dayString = `${dateObj.getDate()}`.padStart(2, "0");
  return `${dateObj.getFullYear()}-${monthString}-${dayString}`;
}

export function defineEventType(eventState, currentDate) {
  const currentDateString = getDateString(currentDate);
  const prevDateString = getDateString(currentDate - ONE_DAY_IN_MS);

  const repeatState = eventState.repeat.value;

  if (getDateString(eventState.date) === currentDateString) return "today";

  if (getDateString(eventState.date) === prevDateString) return "yesterday";
  if (repeatState === "Day") return "everyday";

  if (
    repeatState === "Week" &&
    new Date(currentDate).getDay() === new Date(eventState.date).getDay()
  )
    return "todayWeekMatch";

  if (
    repeatState === "Week" &&
    new Date(currentDate - ONE_DAY_IN_MS).getDay() ===
      new Date(eventState.date).getDay()
  )
    return "yesterdayWeekMatch";

  if (
    repeatState === "Month" &&
    new Date(currentDate).getDate() === new Date(eventState.date).getDate()
  )
    return "todayMonthMatch";

  if (
    repeatState === "Month" &&
    new Date(currentDate - ONE_DAY_IN_MS).getDate() ===
      new Date(eventState.date).getDate()
  )
    return "yesterdayMonthMatch";

  if (
    repeatState === "Year" &&
    getDateString(eventState.date).slice(5) === currentDateString.slice(5)
  )
    return "todayYearMatch";

  if (
    repeatState === "Year" &&
    getDateString(eventState.date).slice(5) === prevDateString.slice(5)
  )
    return "yesterdayYearMatch";
}

export const daysArray = [
  { short: "SUN", full: "Sunday" },
  { short: "MON", full: "Monday" },
  { short: "TUE", full: "Tuesday" },
  { short: "WED", full: "Wednesday" },
  { short: "THU", full: "Thursday" },
  { short: "FRI", full: "Friday" },
  { short: "SAT", full: "Saturday" },
];
