import { createSlice } from "@reduxjs/toolkit";
import {
    fetchClassesByFaculty,
    addAssignment,
    fetchAssignmentsBySubjectCode,
    // add more thunks as needed
} from "./facultyAPI";

const initialState = {
    classes: [],
    subjects: [],
    assignments: {}, // <-- change from [] to {}
    status: "idle",
    error: null,
};

const facultySlice = createSlice({
    name: "faculty",
    initialState,
    reducers: {
        clearFacultyError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Utility to handle pending/rejected
        const addCommonCases = (thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                });
        };

        // CLASSES
        addCommonCases(fetchClassesByFaculty);
        builder.addCase(fetchClassesByFaculty.fulfilled, (state, { payload }) => {
            // payload is expected to be an array of classes
            state.classes = payload || [];
            // Extract unique subjects from classes
            const subjectMap = {};
            state.classes.forEach(cls => {
                if (cls.subject && cls.subject.subjectCode) {
                    subjectMap[cls.subject.subjectCode] = cls.subject;
                }
            });
            state.subjects = Object.values(subjectMap);
            state.status = "succeeded";
        });

        // ASSIGNMENTS
        addCommonCases(fetchAssignmentsBySubjectCode);
        builder.addCase(fetchAssignmentsBySubjectCode.fulfilled, (state, { payload, meta }) => {
            const subjectCode = meta.arg.subjectCode;
            // FIX: Only set the property, not the whole assignments object!
            state.assignments[subjectCode] = Array.isArray(payload) ? payload : [];
            state.status = "succeeded";
        });

        builder.addCase(addAssignment.fulfilled, (state, { payload, meta }) => {
            const subjectCode = meta.arg.subjectCode;
            if (!Array.isArray(state.assignments[subjectCode])) {
                state.assignments[subjectCode] = [];
            }
            state.assignments[subjectCode].push(payload);
            state.status = "succeeded";
        });

        // Add more thunks and cases as needed...
    },
});

export const { clearFacultyError } = facultySlice.actions;
export default facultySlice.reducer;
