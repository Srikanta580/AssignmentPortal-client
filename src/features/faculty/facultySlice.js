import { createSlice, current } from "@reduxjs/toolkit";
import {
    fetchClassesByFaculty,
} from "./facultyAPI";

const initialState = {
    classes: [],
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
        addCommonCases(fetchClassesByFaculty);
        builder.addCase(fetchClassesByFaculty.fulfilled, (state, { payload }) => {
            state.classes = payload.classes || [];
            // console.log("Classes fetched:", current(state.classes));
            state.status = "succeeded";
        });
    },
});

export default facultySlice.reducer;
