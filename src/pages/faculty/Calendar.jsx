// src/components/faculty/FacultyCalendar.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../../components/calendar/Calendar";
import {
  addEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
} from "../../features/calendar/calendarSlice";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.calendar);
  const [facultyEvents, setFacultyEvents] = useState([]);

  useEffect(() => {
    // Fetch events when component mounts
    dispatch(fetchEvents({ userType: "faculty" }));
  }, [dispatch]);

  useEffect(() => {
    // Filter events relevant to faculty
    if (events) {
      setFacultyEvents(
        events.filter(
          (event) =>
            event.userType === "faculty" || event.createdBy === "faculty"
        )
      );
    }
  }, [events]);

  const handleAddEvent = (eventData) => {
    dispatch(
      addEvent({
        ...eventData,
        userType: "faculty",
        createdBy: "faculty",
        createdAt: new Date().toISOString(),
      })
    );
  };

  const handleEditEvent = (eventData) => {
    dispatch(
      updateEvent({
        ...eventData,
        updatedAt: new Date().toISOString(),
      })
    );
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  if (loading) {
    return <div className="loading">Loading calendar...</div>;
  }

  if (error) {
    return <div className="error">Error loading calendar: {error}</div>;
  }

  return (
    <div className="faculty-calendar-page">
      <div className="page-header">
        <h1>Faculty Calendar</h1>
        <p>Manage your class schedule, office hours, exams, and assignments</p>
      </div>

      <div className="calendar-container">
        <Calendar
          userType="faculty"
          events={facultyEvents}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>

      <div className="calendar-tools">
        <div className="calendar-legend">
          <h3>Event Types</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#0a9396" }}
              ></span>
              <span>Class Session</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#e63946" }}
              ></span>
              <span>Assignment Due</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#d62828" }}
              ></span>
              <span>Exam</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#ee9b00" }}
              ></span>
              <span>Office Hours</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#005f73" }}
              ></span>
              <span>Meeting</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="btn btn-primary">Add Office Hours</button>
          <button className="btn">Add Class Sessions</button>
          <button className="btn">Schedule Assignment</button>
          <button className="btn">Import Academic Calendar</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
