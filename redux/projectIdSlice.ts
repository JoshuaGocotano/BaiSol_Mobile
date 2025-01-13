import { createSlice } from "@reduxjs/toolkit";

export const projectIdSlice = createSlice({
  name: "projectId",
  initialState: {
    projectId: "",
  },
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    clearProjectId: (state) => {
      state.projectId = "";
    },
  },
});

export const { setProjectId, clearProjectId } = projectIdSlice.actions;
export const selectProjectId = (state: { projectId: { projectId: string } }) =>
  state.projectId.projectId;
export default projectIdSlice.reducer;
