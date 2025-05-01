// src/components/calendar/EventForm.jsx
import React, { useState, useEffect } from "react";

const EventForm = ({ event, selectedDate, onSubmit, onCancel, userType }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    type: userType === "faculty" ? "class" : "study",
    recurrence: "none", // none, daily, weekly, monthly
    notifyBefore: 30, // minutes
    location: "",
    courseId: "",
  });

  useEffect(() => {
    if (event) {
      // If editing existing event, populate form
      setFormData({
        ...event,
        startTime: formatDateTimeForInput(new Date(event.startTime)),
        endTime: formatDateTimeForInput(new Date(event.endTime)),
      });
    } else if (selectedDate) {
      // For new events, set the selected date and default times
      const startDateTime = new Date(selectedDate);
      startDateTime.setMinutes(0); // Reset minutes for cleaner default time

      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + 1); // Default 1 hour duration

      setFormData({
        ...formData,
        startTime: formatDateTimeForInput(startDateTime),
        endTime: formatDateTimeForInput(endDateTime),
      });
    }
  }, [event, selectedDate]);

  const formatDateTimeForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    });
  };

  // Event types available for each user role
  const facultyEventTypes = [
    { value: "class", label: "Class Session" },
    { value: "office_hours", label: "Office Hours" },
    { value: "assignment", label: "Assignment Due" },
    { value: "exam", label: "Exam" },
    { value: "meeting", label: "Meeting" },
    { value: "other", label: "Other" },
  ];

  const studentEventTypes = [
    { value: "study", label: "Study Session" },
    { value: "group_meeting", label: "Group Meeting" },
    { value: "reminder", label: "Reminder" },
    { value: "other", label: "Other" },
  ];

  const eventTypes =
    userType === "faculty" ? facultyEventTypes : studentEventTypes;

  return (
    <div className="event-form">
      <div className="event-form-content">
        <h2>{event ? "Edit Event" : "Add New Event"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                className="form-control"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="form-control"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="type">Event Type</label>
            <select
              id="type"
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {userType === "faculty" && (
            <>
              <div className="form-group">
                <label htmlFor="courseId">Course</label>
                <select
                  id="courseId"
                  name="courseId"
                  className="form-control"
                  value={formData.courseId}
                  onChange={handleChange}
                >
                  <option value="">Select a course</option>
                  {/* This would be populated from your courses data */}
                  <option value="cs101">CS101 - Intro to Programming</option>
                  <option value="cs201">CS201 - Data Structures</option>
                  <option value="cs301">CS301 - Algorithms</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Room number or online link"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="recurrence">Recurrence</label>
            <select
              id="recurrence"
              name="recurrence"
              className="form-control"
              value={formData.recurrence}
              onChange={handleChange}
            >
              <option value="none">None (One-time event)</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notifyBefore">Notification</label>
            <select
              id="notifyBefore"
              name="notifyBefore"
              className="form-control"
              value={formData.notifyBefore}
              onChange={handleChange}
            >
              <option value="0">No notification</option>
              <option value="10">10 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {event ? "Update Event" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
