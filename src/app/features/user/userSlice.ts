import { createSlice } from "@reduxjs/toolkit";
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface InitialState {
  user: User;
  isEdit: boolean;
}

const initialState: InitialState = {
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
  },
  isEdit: false,
};

const userSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    addEditUserData: (state, action) => {
      state.user = action.payload;
      state.isEdit = true;
    },

    removeEditUserData: (state) => {
      state.user = { id: "", name: "", email: "", password: "" };
      state.isEdit = false;
    },
  },
});

export const { addEditUserData, removeEditUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
