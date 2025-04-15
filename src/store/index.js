import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clientSlice';
import checklistReducer from './checklistSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    checklist: checklistReducer,
  },
});