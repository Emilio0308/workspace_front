import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: localStorage.getItem("token") ? true : false,
    userName: localStorage.getItem("userName") || "",
    userId: localStorage.getItem("userId") || "",
    token: localStorage.getItem("token") || "",
    allWorkspaces: [],
    currentWorkspace: {},
    currentTaskToEdit: null,
  },
};

export const user = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
    login: (state, action) => {
      const { username, user_id, access } = action.payload;
      const newStateValue = {
        ...state.value,
        isAuth: true,
        userName: username,
        userId: user_id,
        token: access,
      };
      localStorage.setItem("token", access);
      localStorage.setItem("userId", user_id);
      localStorage.setItem("userName", username);
      state.value = newStateValue;
    },
    addCurrentWorkspace: (state, action) => {
      const newStateValue = {
        ...state.value,
        currentWorkspace: action.payload,
      };
      state.value = newStateValue;
    },
    allWorkspaces: (state, action) => {
      const newStateValue = {
        ...state.value,
        allWorkspaces: [...action.payload],
      };
      state.value = newStateValue;
    },
    selectTaskToEdit: (state, action) => {
      const newStateValue = {
        ...state.value,
        currentTaskToEdit: action.payload,
      };
      state.value = newStateValue;
    },
  },
});

export const {
  login,
  logout,
  addCurrentWorkspace,
  allWorkspaces,
  selectTaskToEdit,
} = user.actions;

export default user.reducer;
