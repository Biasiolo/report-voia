import { createSlice } from '@reduxjs/toolkit';
import platforms from '../data/platforms';

const initialState = {
  selectedPlatforms: [],
  observations: {},
  progress: {}, // { platformId: [ {id, label, done, quantity, frequency, responsavel} ] }
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    setObservation: (state, action) => {
      const { platformId, text } = action.payload;
      state.observations[platformId] = text;
    },

    addCustomItem: (state, action) => {
      const {
        platformId,
        label,
        quantity = 1,
        frequency = 'única',
        responsavel = ''
      } = action.payload;

      const newItem = {
        id: `custom_${Date.now()}`,
        label,
        done: false,
        custom: true,
        quantity,
        frequency,
        responsavel
      };

      if (!state.progress[platformId]) {
        state.progress[platformId] = [];
      }

      state.progress[platformId].push(newItem);
    },

    selectPlatforms: (state, action) => {
      state.selectedPlatforms = action.payload;
      state.progress = {};

      action.payload.forEach((platformId) => {
        const platform = platforms.find((p) => p.id === platformId);
        if (platform) {
          state.progress[platformId] = platform.checklist.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
            frequency: item.frequency || 'única',
            responsavel: item.responsavel || ''
          }));
        }
      });
    },

    updateChecklistField: (state, action) => {
      const { platformId, itemId, field, value } = action.payload;
      const checklist = state.progress[platformId];
      const item = checklist.find((i) => i.id === itemId);
      if (item) {
        item[field] = value;
      }
    },

    toggleChecklistItem: (state, action) => {
      const { platformId, itemId } = action.payload;
      const checklist = state.progress[platformId];
      const item = checklist.find((i) => i.id === itemId);
      if (item) item.done = !item.done;
    },

    clearChecklist: () => initialState,
  },
});

export const {
  selectPlatforms,
  toggleChecklistItem,
  setObservation,
  addCustomItem,
  clearChecklist,
  updateChecklistField,
} = checklistSlice.actions;

export default checklistSlice.reducer;
