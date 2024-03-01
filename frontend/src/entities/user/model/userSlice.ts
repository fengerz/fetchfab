import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "..";
import { IUser } from "../../../shared/api/IUser";

interface UserState {
  isAuth: boolean;
  currentUser: null | IUser;
}

const initialState: UserState = {
  isAuth: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.auth.matchFulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.isAuth = true;
      })
      .addMatcher(userApi.endpoints.auth.matchRejected, (state) => {
        state.currentUser = null;
        state.isAuth = false;
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.currentUser = null;
        state.isAuth = false;
      });
  },
});

export default userSlice.reducer;
