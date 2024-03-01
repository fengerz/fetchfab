import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  authDialog: {
    show: boolean;
    type: "signin" | "signup";
  };

  toast: {
    show: boolean;
    variant: AlertColor | undefined;
    text: string;
  };
}

const initialState: AppState = {
  authDialog: {
    show: false,
    type: "signin",
  },

  toast: {
    show: false,
    variant: "info",
    text: "",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSignInDialog(state) {
      state.authDialog.show = true;
      state.authDialog.type = "signin";
    },

    openSignUpDialog(state) {
      state.authDialog.show = true;
      state.authDialog.type = "signup";
    },

    closeAuthDialog(state) {
      state.authDialog.show = false;
    },

    showSuccessToast(state, action: PayloadAction<string>) {
      state.toast.show = true;
      state.toast.variant = "success";
      state.toast.text = action.payload;
    },

    showInfoToast(state, action: PayloadAction<string>) {
      state.toast.show = true;
      state.toast.variant = "info";
      state.toast.text = action.payload;
    },

    showFailtureToast(state, action: PayloadAction<string>) {
      state.toast.show = true;
      state.toast.variant = "error";
      state.toast.text = action.payload;
    },

    hideToast(state) {
      state.toast.show = false;
    },
  },
});

export default appSlice.reducer;
export const {
  openSignInDialog,
  openSignUpDialog,
  closeAuthDialog,
  showSuccessToast,
  showInfoToast,
  showFailtureToast,
  hideToast,
} = appSlice.actions;
