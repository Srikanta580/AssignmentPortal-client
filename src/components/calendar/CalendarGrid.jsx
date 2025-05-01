// src/components/calendar/CalendarGrid.jsx
import React from "react";
import EventItem from "./EventItem";

const CalendarGrid = ({
  currentDate,
  view,
  monthData,
  onDateClick,
  userType,
}) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderMonthView = () => {
    return (
      <>
        {weekdays.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {monthData.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isToday =
              day.date &&
              day.date.getDate() === new Date().getDate() &&
              day.date.getMonth() === new Date().getMonth() &&
              day.date.getFullYear() === new Date().getFullYear();

            const isOtherMonth =
              day.date && day.date.getMonth() !== currentDate.getMonth();

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`calendar-day ${isOtherMonth ? "other-month" : ""} ${
                  isToday ? "today" : ""
                }`}
                onClick={() => day.date && onDateClick(day.date)}
              >
                {day.date && (
                  <>
                    <div className="day-number">{day.date.getDate()}</div>
                    {day.events && day.events.length > 0 && (
                      <div className="day-events">
                        {day.events.slice(0, 3).map((event, idx) => (
                          <div key={idx} className="event-indicator">
                            <span
                              className="event-dot"
                              style={{
                                backgroundColor:
                                  event.type === "assignment"
                                    ? "#e63946"
                                    : event.type === "exam"
                                    ? "#d62828"
                                    : event.type === "class"
                                    ? "#0a9396"
                                    : event.type === "study"
                                    ? "#94d2bd"
                                    : event.type === "office_hours"
                                    ? "#ee9b00"
                                    : "#005f73",
                              }}
                            />
                            <span className="event-title-preview">
                              {event.title.substring(0, 10)}
                              {event.title.length > 10 ? "..." : ""}
                            </span>
                          </div>
                        ))}
                        {day.events.length > 3 && (
                          <div className="more-events">
                            +{day.events.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </>
    );
  };

  const renderWeekView = () => {
    // Get the first day of the week containing the current date
    const firstDayOfWeek = new Date(currentDate);
    const day = currentDate.getDay();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - day);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(firstDayOfWeek);
      currentDay.setDate(firstDayOfWeek.getDate() + i);
      weekDays.push(currentDay);
    }

    return (
      <div className="week-view">
        <div className="week-header">
          {weekDays.map((date, index) => (
            <div key={index} className="week-day-header">
              <div>{weekdays[index]}</div>
              <div>{date.getDate()}</div>
            </div>
          ))}
        </div>
        <div className="week-body">
          {/* Render time slots for each day */}
          {Array.from({ length: 24 }).map((_, hour) => (
            <div key={hour} className="week-hour-row">
              <div className="week-hour">{hour}:00</div>
              <div className="week-slots">
                {weekDays.map((date, dayIndex) => {
                  // Find events for this time slot
                  const dayEvents =
                    monthData
                      .flat()
                      .find(
                        (day) =>
                          day.date &&
                          day.date.getDate() === date.getDate() &&
                          day.date.getMonth() === date.getMonth()
                      )?.events || [];

                  const hourEvents = dayEvents.filter((event) => {
                    const eventHour = new Date(event.startTime).getHours();
                    return eventHour === hour;
                  });

                  return (
                    <div
                      key={dayIndex}
                      className="week-slot"
                      onClick={() => {
                        const slotDate = new Date(date);
                        slotDate.setHours(hour);
                        onDateClick(slotDate);
                      }}
                    >
                      {hourEvents.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`week-event ${userType}-event`}
                          style={{
                            backgroundColor:
                              event.type === "assignment"
                                ? "rgba(230, 57, 70, 0.2)"
                                : event.type === "exam"
                                ? "rgba(214, 40, 40, 0.2)"
                                : event.type === "class"
                                ? "rgba(10, 147, 150, 0.2)"
                                : event.type === "study"
                                ? "rgba(148, 210, 189, 0.2)"
                                : event.type === "office_hours"
                                ? "rgba(238, 155, 0, 0.2)"
                                : "rgba(0, 95, 115, 0.2)",
                            borderLeft: `4px solid ${
                              event.type === "assignment"
                                ? "#e63946"
                                : event.type === "exam"
                                ? "#d62828"
                                : event.type === "class"
                                ? "#0a9396"
                                : event.type === "study"
                                ? "#94d2bd"
                                : event.type === "office_hours"
                                ? "#ee9b00"
                                : "#005f73"
                            }`,
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    // Find events for the selected day
    const dayEvents =
      monthData
        .flat()
        .find(
          (day) =>
            day.date &&
            day.date.getDate() === currentDate.getDate() &&
            day.date.getMonth() === currentDate.getMonth() &&
            day.date.getFullYear() === currentDate.getFullYear()
        )?.events || [];

    return (
      <div className="day-view">
        <div className="day-header">
          <h3>
            {weekdays[currentDate.getDay()]}, {currentDate.getDate()}
          </h3>
        </div>
        <div className="day-body">
          {/* Render time slots */}
          {Array.from({ length: 24 }).map((_, hour) => {
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = new Date(event.startTime).getHours();
              return eventHour === hour;
            });

            return (
              <div key={hour} className="day-hour-row">
                <div className="day-hour">{hour}:00</div>
                <div
                  className="day-slot"
                  onClick={() => {
                    const slotDate = new Date(currentDate);
                    slotDate.setHours(hour);
                    onDateClick(slotDate);
                  }}
                >
                  {hourEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`day-event ${userType}-event`}
                      style={{
                        backgroundColor:
                          event.type === "assignment"
                            ? "rgba(230, 57, 70, 0.2)"
                            : event.type === "exam"
                            ? "rgba(214, 40, 40, 0.2)"
                            : event.type === "class"
                            ? "rgba(10, 147, 150, 0.2)"
                            : event.type === "study"
                            ? "rgba(148, 210, 189, 0.2)"
                            : event.type === "office_hours"
                            ? "rgba(238, 155, 0, 0.2)"
                            : "rgba(0, 95, 115, 0.2)",
                        borderLeft: `4px solid ${
                          event.type === "assignment"
                            ? "#e63946"
                            : event.type === "exam"
                            ? "#d62828"
                            : event.type === "class"
                            ? "#0a9396"
                            : event.type === "study"
                            ? "#94d2bd"
                            : event.type === "office_hours"
                            ? "#ee9b00"
                            : "#005f73"
                        }`,
                      }}
                    >
                      <div>{event.title}</div>
                      <div>{event.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`calendar-grid ${view}-view`}>
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
    </div>
  );
};

export default CalendarGrid;
