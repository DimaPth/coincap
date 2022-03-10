import { createSlice } from "@reduxjs/toolkit";


export const localStoreSlice = createSlice({
  name: 'local',
  initialState: {
    localData: Object.values(localStorage).map((item) => JSON.parse(item)) || [],
  },
  reducers: {
    addLocalItem (state, action) {
      localStorage.setItem(action.payload.id, JSON.stringify(action.payload));
      state.localData = Object.values(localStorage).map((item) => JSON.parse(item));
    },
    removeLocalItem(state, action) {
      localStorage.removeItem(action.payload);
      state.localData = Object.values(localStorage).map((item) => JSON.parse(item));
    }
  },
})

export const {addLocalItem, removeLocalItem, getFullPrice} = localStoreSlice.actions;