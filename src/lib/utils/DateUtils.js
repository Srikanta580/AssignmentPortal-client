// src/components/calendar/DateUtils.js

// Generate the matrix of days for the month view
export const getMonthData = (date, events = []) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Get the first day of the month
  const firstDay = new Date(year, month, 1);
  // Get the last day of the month
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate days from previous month to display
  const prevMonthDays = startingDayOfWeek;

  // Calculate total cells needed (previous month days + current month days + next month days)
  const totalCells = Math.ceil((prevMonthDays + daysInMonth) / 7) * 7;

  // Calculate days from next month to display
  const nextMonthDays = totalCells - (prevMonthDays + daysInMonth);

  // Create calendar data as a matrix of weeks and days
  const monthData = [];
  let week = [];

  // Add days from previous month
  const prevMonth = new Date(year, month, 0);
  const prevMonthLastDay = prevMonth.getDate();

  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(year, month - 1, day);

    // Find events for this day
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month - 1 &&
        eventDate.getFullYear() === year
      );
    });

    week.push({ date, events: dayEvents });
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    // Find events for this day
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });

    week.push({ date, events: dayEvents });

    // Start a new week if we've filled a row or reached the end
    if (week.length === 7) {
      monthData.push(week);
      week = [];
    }
  }

  // Add days from next month
  for (let day = 1; day <= nextMonthDays; day++) {
    const date = new Date(year, month + 1, day);

    // Find events for this day
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month + 1 &&
        eventDate.getFullYear() === year
      );
    });

    week.push({ date, events: dayEvents });

    // Start a new week if we've filled a row
    if (week.length === 7) {
      monthData.push(week);
      week = [];
    }
  }

  return monthData;
};

// Get date range for a week
export const getWeekRange = (date) => {
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return { startOfWeek, endOfWeek };
};

// Format date as YYYY-MM-DD
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Check if a date is today
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Generate array of dates for a week
export const getDatesInWeek = (date) => {
  const { startOfWeek } = getWeekRange(date);
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    dates.push(day);
  }

  return dates;
};

// Generate time slots for day view
export const getTimeSlots = () => {
  const slots = [];

  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  return slots;
};
