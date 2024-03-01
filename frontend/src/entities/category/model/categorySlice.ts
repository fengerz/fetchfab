import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../../shared/api/ICategory";
import { categoryApi } from "../api/categoryApi";

interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.fetchCategories.matchFulfilled,
      (state, action) => {
        state.categories = action.payload.data;
      }
    );
  },
});

export default categorySlice.reducer;
