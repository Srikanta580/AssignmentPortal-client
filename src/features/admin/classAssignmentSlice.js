// src/store/classAssignmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state with sample data
const initialState = {
  departments: [
    { id: "dept1", name: "Computer Science" },
    { id: "dept2", name: "Mathematics" },
    { id: "dept3", name: "Physics" },
  ],
  faculty: [
    { id: "fac1", name: "Dr. Brown", departmentId: "dept1" },
    { id: "fac2", name: "Dr. Johnson", departmentId: "dept1" },
    { id: "fac3", name: "Dr. Smith", departmentId: "dept2" },
    { id: "fac4", name: "Dr. Davis", departmentId: "dept3" },
  ],
  subjects: [
    {
      id: "sub1",
      code: "CS101",
      name: "Introduction to Programming",
      departmentId: "dept1",
      semester: "1",
    },
    {
      id: "sub2",
      code: "CS202",
      name: "Data Structures",
      departmentId: "dept1",
      semester: "2",
    },
    {
      id: "sub3",
      code: "MATH303",
      name: "Linear Algebra",
      departmentId: "dept2",
      semester: "3",
    },
    {
      id: "sub4",
      code: "PHY404",
      name: "Quantum Mechanics",
      departmentId: "dept3",
      semester: "4",
    },
  ],
  assignments: [
    {
      id: 1,
      departmentId: "dept1",
      departmentName: "Computer Science",
      facultyId: "fac1",
      facultyName: "Dr. Brown",
      subjectId: "sub1",
      subjectName: "CS101: Introduction to Programming",
      semester: "1",
      classTime: "Mon, Wed 10:00-11:30 AM",
      location: "Building A, Room 101",
    },
    {
      id: 2,
      departmentId: "dept1",
      departmentName: "Computer Science",
      facultyId: "fac2",
      facultyName: "Dr. Johnson",
      subjectId: "sub2",
      subjectName: "CS202: Data Structures",
      semester: "2",
      classTime: "Tue, Thu 2:00-3:30 PM",
      location: "Building B, Room 205",
    },
    {
      id: 3,
      departmentId: "dept2",
      departmentName: "Mathematics",
      facultyId: "fac3",
      facultyName: "Dr. Smith",
      subjectId: "sub3",
      subjectName: "MATH303: Linear Algebra",
      semester: "3",
      classTime: "Mon, Wed, Fri 1:00-2:00 PM",
      location: "Building C, Room 310",
    },
  ],
  facultyClasses: {
    current: [
      {
        id: 1,
        subjectCode: "CS101",
        subjectName: "Introduction to Programming",
        semester: "1",
        department: "Computer Science",
        classTime: "Mon, Wed 10:00-11:30 AM",
        location: "Building A, Room 101",
        studentsCount: 45,
        nextClass: "Monday, Apr 29, 2025 - 10:00 AM",
        materials: [
          { id: 1, name: "Week 1: Introduction to Variables", type: "pdf" },
          { id: 2, name: "Week 2: Control Flow", type: "ppt" },
        ],
      },
      {
        id: 2,
        subjectCode: "CS202",
        subjectName: "Data Structures",
        semester: "2",
        department: "Computer Science",
        classTime: "Tue, Thu 2:00-3:30 PM",
        location: "Building B, Room 205",
        studentsCount: 38,
        nextClass: "Tuesday, Apr 29, 2025 - 2:00 PM",
        materials: [
          { id: 1, name: "Week 1: Arrays and Linked Lists", type: "pdf" },
          { id: 2, name: "Week 2: Stacks and Queues", type: "ppt" },
        ],
      },
      {
        id: 3,
        subjectCode: "CS480",
        subjectName: "Artificial Intelligence",
        semester: "4",
        department: "Computer Science",
        classTime: "Fri 9:00-12:00 PM",
        location: "Building C, Room 310",
        studentsCount: 32,
        nextClass: "Friday, May 2, 2025 - 9:00 AM",
        materials: [
          { id: 1, name: "Week 1: Introduction to AI", type: "pdf" },
          { id: 2, name: "Week 2: Search Algorithms", type: "ppt" },
        ],
      },
    ],
    past: [
      {
        id: 4,
        subjectCode: "CS303",
        subjectName: "Database Systems",
        semester: "3",
        department: "Computer Science",
        classTime: "Mon, Wed 1:00-2:30 PM",
        location: "Building A, Room 105",
        term: "Fall 2024",
        studentsCount: 40,
      },
      {
        id: 5,
        subjectCode: "CS404",
        subjectName: "Operating Systems",
        semester: "4",
        department: "Computer Science",
        classTime: "Tue, Thu 11:00-12:30 PM",
        location: "Building B, Room 210",
        term: "Fall 2024",
        studentsCount: 35,
      },
    ],
  },
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

      // Also update the faculty classes if the assigned faculty is the currently logged in user
      // In a real app, you'd check this against the current user ID
      const facultyClass = {
        id: newAssignment.id,
        subjectCode: newAssignment.subjectName.split(":")[0].trim(),
        subjectName: newAssignment.subjectName.split(":")[1].trim(),
        semester: newAssignment.semester,
        department: newAssignment.departmentName,
        classTime: newAssignment.classTime,
        location: newAssignment.location,
        studentsCount: 0, // Default value for new class
        nextClass: "Not scheduled", // Default value
        materials: [],
      };

      state.facultyClasses.current.push(facultyClass);
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

        // Update faculty classes if needed
        const facultyClassIndex = state.facultyClasses.current.findIndex(
          (fc) => fc.id === id
        );
        if (facultyClassIndex !== -1) {
          state.facultyClasses.current[facultyClassIndex] = {
            ...state.facultyClasses.current[facultyClassIndex],
            subjectCode:
              updates.subjectName?.split(":")[0].trim() ||
              state.facultyClasses.current[facultyClassIndex].subjectCode,
            subjectName:
              updates.subjectName?.split(":")[1].trim() ||
              state.facultyClasses.current[facultyClassIndex].subjectName,
            semester:
              updates.semester ||
              state.facultyClasses.current[facultyClassIndex].semester,
            department:
              updates.departmentName ||
              state.facultyClasses.current[facultyClassIndex].department,
            classTime:
              updates.classTime ||
              state.facultyClasses.current[facultyClassIndex].classTime,
            location:
              updates.location ||
              state.facultyClasses.current[facultyClassIndex].location,
          };
        }
      }
    },

    // Add course material to a faculty class
    addCourseMaterial: (state, action) => {
      const { classId, material } = action.payload;
      const classIndex = state.facultyClasses.current.findIndex(
        (fc) => fc.id === classId
      );

      if (classIndex !== -1) {
        const newMaterial = {
          id:
            state.facultyClasses.current[classIndex].materials.length > 0
              ? Math.max(
                  ...state.facultyClasses.current[classIndex].materials.map(
                    (m) => m.id
                  )
                ) + 1
              : 1,
          ...material,
        };

        state.facultyClasses.current[classIndex].materials.push(newMaterial);
      }
    },

    // Add a new department
    addDepartment: (state, action) => {
      const newId = `dept${state.departments.length + 1}`;
      state.departments.push({
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
        departmentId: action.payload.departmentId,
      });
    },

    // Add a new subject
    addSubject: (state, action) => {
      const newId = `sub${state.subjects.length + 1}`;
      state.subjects.push({
        id: newId,
        code: action.payload.code,
        name: action.payload.name,
        departmentId: action.payload.departmentId,
        semester: action.payload.semester,
      });
    },
  },
});

// Export actions
export const {
  assignFacultyToClass,
  updateAssignment,
  addCourseMaterial,
  addDepartment,
  addFaculty,
  addSubject,
} = classAssignmentSlice.actions;

// Export selectors
export const selectDepartments = (state) => state.class.departments;
export const selectFaculty = (state) => state.class.faculty;
export const selectSubjects = (state) => state.class.subjects;
export const selectAssignments = (state) => state.class.assignments;
export const selectFacultyClasses = (state) => state.class.facultyClasses;

export default classAssignmentSlice.reducer;
