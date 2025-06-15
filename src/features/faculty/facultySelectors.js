import { createSelector } from "reselect";

export const selectAssignmentsBySubject = (subjectCode) =>
    createSelector(
        (state) => state.faculty.assignments,
        (assignments) => assignments?.[subjectCode] || []
    );