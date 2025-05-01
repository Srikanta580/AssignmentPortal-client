// src/store/calendarSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Sample initial event data (in a real app, this would come from an API)
const initialEvents = [
  // Faculty events
  {
    id: 1,
    title: "CS101 Lecture",
    description: "Introduction to Programming Concepts",
    startTime: "2025-04-28T10:00:00.000Z",
    endTime: "2025-04-28T11:30:00.000Z",
    type: "class",
    location: "Room 101",
    courseId: "cs101",
    recurrence: "weekly",
    notifyBefore: 30,
    userType: "faculty",
    createdBy: "faculty",
    createdAt: "2025-04-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Office Hours",
    description: "Open consultation for students",
    startTime: "2025-04-28T14:00:00.000Z",
    endTime: "2025-04-28T16:00:00.000Z",
    type: "office_hours",
    location: "Room 203",
    courseId: "cs101",
    recurrence: "weekly",
    notifyBefore: 30,
    userType: "faculty",
    createdBy: "faculty",
    createdAt: "2025-04-01T00:00:00.000Z",
  },
  {
    id: 3,
    title: "CS101 Assignment Due",
    description: "Submit Chapter 3 exercises",
    startTime: "2025-05-02T23:59:00.000Z",
    endTime: "2025-05-02T23:59:00.000Z",
    type: "assignment",
    courseId: "cs101",
    recurrence: "none",
    notifyBefore: 1440,
    userType: "faculty",
    createdBy: "faculty",
    createdAt: "2025-04-01T00:00:00.000Z",
  },
  // Student events
  {
    id: 4,
    title: "Group Study - Programming Basics",
    description: "Review loops and conditionals",
    startTime: "2025-04-29T15:00:00.000Z",
    endTime: "2025-04-29T17:00:00.000Z",
    type: "study",
    location: "Library",
    courseId: "cs101",
    recurrence: "none",
    notifyBefore: 60,
    userType: "student",
    createdBy: "student",
    createdAt: "2025-04-20T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Project Team Meeting",
    description: "Finalize database schema",
    startTime: "2025-04-30T13:00:00.000Z",
    endTime: "2025-04-30T14:30:00.000Z",
    type: "group_meeting",
    location: "Online - Zoom",
    courseId: "cs201",
    recurrence: "none",
    notifyBefore: 30,
    userType: "student",
    createdBy: "student",
    createdAt: "2025-04-22T00:00:00.000Z",
  },
];

// Async thunk for fetching events
export const fetchEvents = createAsyncThunk(
  "calendar/fetchEvents",
  async ({ userType }, { rejectWithValue }) => {
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, this would be an API call
      return initialEvents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addEvent, updateEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
