// src/components/calendar/Calendar.jsx
import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { getMonthData } from "../../lib/utils/DateUtils";
// import "./Calendar.css";

const Calendar = ({
  userType,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month', 'week', 'day'
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const monthData = getMonthData(currentDate, events);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleEventFormSubmit = (eventData) => {
    if (editingEvent) {
      onEditEvent({ ...eventData, id: editingEvent.id });
    } else {
      onAddEvent({ ...eventData, id: Date.now() });
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleEventFormCancel = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onViewChange={handleViewChange}
        currentView={view}
        onToday={today}
        userType={userType}
        onAddEvent={handleAddEvent}
      />

      <div className="calendar-body">
        <CalendarGrid
          currentDate={currentDate}
          view={view}
          monthData={monthData}
          onDateClick={handleDateClick}
          userType={userType}
        />

        <EventList
          events={events}
          selectedDate={selectedDate}
          userType={userType}
          onEditEvent={handleEditEvent}
          onDeleteEvent={onDeleteEvent}
          view={view}
          currentDate={currentDate}
        />
      </div>

      {showEventForm && (
        <EventForm
          event={editingEvent}
          selectedDate={selectedDate || currentDate}
          onSubmit={handleEventFormSubmit}
          onCancel={handleEventFormCancel}
          userType={userType}
        />
      )}
    </div>
  );
};

export default Calendar;
