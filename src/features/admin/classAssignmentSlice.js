// src/store/classAssignmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state with sample data
const initialState = {
  sections: [
    { id: "A", name: "Section A" },
    { id: "B", name: "Section B" },
    { id: "C", name: "Section C" },
    { id: "D", name: "Section D" },
  ],
  faculty: [
    { id: "fac1", name: "Dr. Brown" },
    { id: "fac2", name: "Dr. Johnson" },
    { id: "fac3", name: "Dr. Smith" },
    { id: "fac4", name: "Dr. Davis" },
  ],
  subjects: [
    {
      id: "sub1",
      code: "CS101",
      name: "Introduction to Programming",
      semester: "1",
    },
    {
      id: "sub2",
      code: "CS202",
      name: "Data Structures",
      semester: "2",
    },
    {
      id: "sub3",
      code: "MATH303",
      name: "Linear Algebra",
      semester: "3",
    },
    {
      id: "sub4",
      code: "PHY404",
      name: "Quantum Mechanics",
      semester: "4",
    },
  ],
  assignments: [
    {
      id: 1,
      section: "Section A",
      facultyName: "Dr. Brown",
      subjectName: "CS101: Introduction to Programming",
      semester: "1",
      classTime: "Mon, Wed 10:00-11:30 AM",
      location: "Building A, Room 101",
    },
    {
      id: 2,
      section: "Section A",
      facultyName: "Dr. Johnson",
      subjectName: "CS202: Data Structures",
      semester: "2",
      classTime: "Tue, Thu 2:00-3:30 PM",
      location: "Building B, Room 205",
    },
    {
      id: 3,
      section: "Section B",
      facultyName: "Dr. Smith",
      subjectName: "MATH303: Linear Algebra",
      semester: "3",
      classTime: "Mon, Wed, Fri 1:00-2:00 PM",
      location: "Building C, Room 310",
    },
  ],
};

export const classAssignmentSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    // Add a new assignment
    assignFacultyToClass: (state, action) => {
      const newAssignment = {
        ...action.payload,
        id:
          state.assignments.length > 0
            ? Math.max(...state.assignments.map((a) => a.id)) + 1
            : 1,
      };
      state.assignments.push(newAssignment);
    },

    // Update an existing assignment
    updateAssignment: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.assignments.findIndex((a) => a.id === id);

      if (index !== -1) {
        state.assignments[index] = {
          ...state.assignments[index],
          ...updates,
        };
      }
    },

    // Add a new section
    addSection: (state, action) => {
      const newId = `sec${state.sections.length + 1}`;
      state.sections.push({
        id: newId,
        name: action.payload.name,
      });
    },

    // Add a new faculty member
    addFaculty: (state, action) => {
      const newId = `fac${state.faculty.length + 1}`;
      state.faculty.push({
        id: newId,
        name: action.payload.name,
      });
    },

    // Add a new subject
    addSubject: (state, action) => {
      const newId = `sub${state.subjects.length + 1}`;
      state.subjects.push({
        id: newId,
        code: action.payload.code,
        name: action.payload.name,
        semester: action.payload.semester,
      });
    },
  },
});

// Export actions
export const {
  assignFacultyToClass,
  updateAssignment,
  addSection,
  addFaculty,
  addSubject,
} = classAssignmentSlice.actions;

// Export selectors
export const selectSections = (state) => state.class.sections;
export const selectFaculty = (state) => state.class.faculty;
export const selectSubjects = (state) => state.class.subjects;
export const selectAssignments = (state) => state.class.assignments;

export default classAssignmentSlice.reducer;
