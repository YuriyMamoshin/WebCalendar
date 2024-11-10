export const CURRENT_YEAR = +new Date().getFullYear();

export const CURRENT_MONTH = +new Date().getMonth() + 1;

export const WEEK_DAYS = {
  Sunday: "S",
  Monday: "M",
  Tuesday: "T",
  Wednesday: "W",
  Thursday: "T",
  Friday: "F",
  Saturday: "S",
};

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

export const CALENDAR_WEEKS = 6;

export function showDate(dateObject) {
  return `${Object.keys(WEEK_DAYS)[dateObject.getDay()]}, ${
    Object.keys(CALENDAR_MONTHS)[dateObject.getMonth()]
  } ${dateObject.getDate()}`;
}

export function zeroPad(value, length) {
  return `${value}`.padStart(length, "0");
}

export function getMonthDays(month = CURRENT_MONTH, year = CURRENT_YEAR) {
  const leapYear = year % 4 === 0;
  const februaryDays = leapYear ? 29 : 28;
  const shortMonthDays = 30;
  const longMonthDays = 31;

  switch (month) {
    case 2:
      return februaryDays;
    case 4:
    case 6:
    case 9:
    case 11:
      return shortMonthDays;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return longMonthDays;
  }
}

export function getMonthFirstDay(month = CURRENT_MONTH, year = CURRENT_YEAR) {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
}

export function checkSameMonth(date, basedate = new Date()) {
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
}

export function checkSameDay(date, basedate = new Date()) {
  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
}

export function getPreviousMonth(month, year) {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
}

export function getNextMonth(month, year) {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
}

export default (month = CURRENT_MONTH, year = CURRENT_YEAR) => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
