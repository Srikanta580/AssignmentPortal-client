import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSubjects,
    fetchAssignmentsBySubjectCode,
    submitAssignment,
    fetchAllSubmissionsByRollNo, // <-- import the new thunk
} from "./studentAPI";


const initialState = {
    subjects: [],
    assignments: {},
    submissions: [],
    status: "idle",
    error: null,
};


const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        clearStudentError(state) {
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
        addCommonCases(fetchSubjects);
        builder.addCase(fetchSubjects.fulfilled, (state, { payload }) => {
            state.subjects = Array.isArray(payload) ? payload : [];
            state.status = "succeeded";
        });

        addCommonCases(fetchAssignmentsBySubjectCode);
        builder.addCase(fetchAssignmentsBySubjectCode.fulfilled, (state, { payload, meta }) => {
            const subjectCode = meta.arg.subjectCode;
            state.assignments[subjectCode] = Array.isArray(payload) ? payload : [];
            state.status = "succeeded";
        });

        addCommonCases(submitAssignment);
        builder.addCase(submitAssignment.fulfilled, (state, { payload }) => {
            const index = state.submissions.findIndex(
                (submission) => submission.id === payload.id
            );
            if (index === -1) {
                state.submissions.push(payload);
            } else {
                state.submissions[index] = payload;
            }
            state.status = "succeeded";
        });
        addCommonCases(fetchAllSubmissionsByRollNo);
        builder.addCase(fetchAllSubmissionsByRollNo.fulfilled, (state, { payload }) => {
            state.submissions = Array.isArray(payload) ? payload : [];
            state.status = "succeeded";
        });
    },
});
export const { clearStudentError } = studentSlice.actions;
export default studentSlice.reducer;