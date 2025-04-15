import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  company: '',
  email: '',
  phone: '',
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearClientData: () => initialState,
  },
});

export const { setClientData, clearClientData } = clientSlice.actions;
export default clientSlice.reducer;
