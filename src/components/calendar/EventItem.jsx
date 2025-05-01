// src/components/calendar/EventItem.jsx
import React from "react";

const EventItem = ({ event, userType, onEdit, onDelete }) => {
  // Format date and time for display
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get event type color
  const getEventColor = (type) => {
    switch (type) {
      case "class":
        return "#0a9396";
      case "assignment":
        return "#e63946";
      case "exam":
        return "#d62828";
      case "study":
        return "#94d2bd";
      case "office_hours":
        return "#ee9b00";
      case "meeting":
        return "#005f73";
      case "group_meeting":
        return "#2a9d8f";
      case "reminder":
        return "#f4a261";
      default:
        return "#6c757d";
    }
  };

  // Get readable event type for display
  const getEventTypeLabel = (type) => {
    switch (type) {
      case "class":
        return "Class Session";
      case "assignment":
        return "Assignment Due";
      case "exam":
        return "Exam";
      case "study":
        return "Study Session";
      case "office_hours":
        return "Office Hours";
      case "meeting":
        return "Meeting";
      case "group_meeting":
        return "Group Meeting";
      case "reminder":
        return "Reminder";
      default:
        return "Event";
    }
  };

  return (
    <div
      className={`event-item ${userType}-event`}
      style={{ borderLeftColor: getEventColor(event.type) }}
    >
      <div className="event-header">
        <h4>{event.title}</h4>
        <span
          className="event-type-label"
          style={{ color: getEventColor(event.type) }}
        >
          {getEventTypeLabel(event.type)}
        </span>
      </div>

      <div className="event-time">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </div>

      {event.location && (
        <div className="event-location">
          <span>📍 {event.location}</span>
        </div>
      )}

      {event.description && (
        <p className="event-description">{event.description}</p>
      )}

      <div className="event-actions">
        <button
          className="btn btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventItem;
