// src/components/student/StudentCalendar.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../../components/calendar/Calendar";
import { fetchEvents } from "../../features/calendar/calendarSlice";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.calendar);
  const [studentEvents, setStudentEvents] = useState([]);
  const [courseFilter, setCourseFilter] = useState("all");

  useEffect(() => {
    // Fetch events when component mounts
    dispatch(fetchEvents({ userType: "student" }));
  }, [dispatch]);

  useEffect(() => {
    // Filter events relevant to students
    if (events) {
      let filteredEvents = events.filter(
        (event) =>
          // Show events created by faculty (classes, assignments, etc.)
          event.createdBy === "faculty" ||
          // Show student's own events
          (event.userType === "student" && event.createdBy === "student")
      );

      // Apply course filter if selected
      if (courseFilter !== "all") {
        filteredEvents = filteredEvents.filter(
          (event) => event.courseId === courseFilter
        );
      }

      setStudentEvents(filteredEvents);
    }
  }, [events, courseFilter]);

  if (loading) {
    return <div className="loading">Loading calendar...</div>;
  }

  if (error) {
    return <div className="error">Error loading calendar: {error}</div>;
  }

  return (
    <div className="student-calendar-page">
      <div className="page-header">
        <h1>My Academic Calendar</h1>
        <p>Track your classes, assignments, exams, and study schedule</p>
      </div>

      <div className="filters">
        <label htmlFor="courseFilter">Filter by Course:</label>
        <select
          id="courseFilter"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="form-control"
        >
          <option value="all">All Courses</option>
          <option value="cs101">CS101 - Intro to Programming</option>
          <option value="cs201">CS201 - Data Structures</option>
          <option value="cs301">CS301 - Algorithms</option>
        </select>
      </div>

      <div className="calendar-container">
        <Calendar userType="student" events={studentEvents} />
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
                style={{ backgroundColor: "#94d2bd" }}
              ></span>
              <span>Study Session</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: "#2a9d8f" }}
              ></span>
              <span>Group Meeting</span>
            </div>
          </div>
        </div>

        <div className="upcoming-deadlines">
          <h3>Upcoming Deadlines</h3>
          <ul className="deadlines-list">
            {studentEvents
              .filter(
                (event) =>
                  ["assignment", "exam"].includes(event.type) &&
                  new Date(event.startTime) > new Date()
              )
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .slice(0, 5)
              .map((event) => (
                <li key={event.id} className="deadline-item">
                  <div className="deadline-date">
                    {new Date(event.startTime).toLocaleDateString()}
                  </div>
                  <div className="deadline-title">{event.title}</div>
                  <div className="deadline-course">{event.courseId}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
