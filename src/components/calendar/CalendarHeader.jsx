// src/components/calendar/CalendarHeader.jsx
import React from "react";

const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onViewChange,
  currentView,
  onToday,
  userType,
  onAddEvent,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar-header">
      <div className="calendar-title">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </div>

      <div className="calendar-nav">
        <div className="view-selector">
          <button
            className={`view-btn ${currentView === "month" ? "active" : ""}`}
            onClick={() => onViewChange("month")}
          >
            Month
          </button>
          <button
            className={`view-btn ${currentView === "week" ? "active" : ""}`}
            onClick={() => onViewChange("week")}
          >
            Week
          </button>
          <button
            className={`view-btn ${currentView === "day" ? "active" : ""}`}
            onClick={() => onViewChange("day")}
          >
            Day
          </button>
        </div>

        <button className="btn" onClick={onToday}>
          Today
        </button>
        <button className="btn" onClick={onPrevMonth}>
          &lt;
        </button>
        <button className="btn" onClick={onNextMonth}>
          &gt;
        </button>

        {/* Faculty can add any event, students have limited options */}
        {userType === "faculty" ? (
          <button className="btn btn-primary" onClick={onAddEvent}>
            Add Event
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onAddEvent}>
            Add Study Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarHeader;
