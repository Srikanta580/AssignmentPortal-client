// src/components/calendar/EventList.jsx
import React from "react";
import EventItem from "./EventItem";

const EventList = ({
  events,
  selectedDate,
  userType,
  onEditEvent,
  onDeleteEvent,
  view,
  currentDate,
}) => {
  // Filter events based on the selected date or view
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime);

    if (selectedDate) {
      // If a specific date is selected, show only events for that date
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    } else if (view === "day") {
      // In day view, show events for the current date
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    } else if (view === "week") {
      // In week view, show events for the current week
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = currentDate.getDay();
      startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    } else {
      // In month view, show events for the current month
      return (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    }
  });

  // Sort events by date and time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.startTime) - new Date(b.startTime);
  });

  // Group events by date
  const eventsByDate = sortedEvents.reduce((acc, event) => {
    const eventDate = new Date(event.startTime);
    const dateStr = eventDate.toDateString();

    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }

    acc[dateStr].push(event);
    return acc;
  }, {});

  return (
    <div className="events-list">
      <h3>
        {selectedDate
          ? `Events for ${selectedDate.toDateString()}`
          : view === "day"
          ? `Events for ${currentDate.toDateString()}`
          : view === "week"
          ? "This Week's Events"
          : "This Month's Events"}
      </h3>

      {Object.keys(eventsByDate).length === 0 ? (
        <p className="no-events">No events to display.</p>
      ) : (
        Object.entries(eventsByDate).map(([dateStr, dateEvents]) => (
          <div key={dateStr} className="date-events-group">
            {/* Only show date headers if we're not filtering by a specific date */}
            {!selectedDate && view !== "day" && (
              <h4 className="date-header">{dateStr}</h4>
            )}

            {dateEvents.map((event) => (
              <EventItem
                key={event.id}
                event={event}
                userType={userType}
                onEdit={() => onEditEvent(event)}
                onDelete={() => onDeleteEvent(event.id)}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
