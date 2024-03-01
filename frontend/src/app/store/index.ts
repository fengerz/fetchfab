import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "../../entities/user/model/userSlice";
import appSlice from "./appSlice";
import { api } from "../../shared/api";
import categorySlice from "../../entities/category/model/categorySlice";

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
  category: categorySlice,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
