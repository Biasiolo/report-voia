import { createSlice } from '@reduxjs/toolkit';
import platforms from '../data/platforms';

const initialState = {
  selectedPlatforms: [],
  observations: {},
  progress: {}, // { platformId: [ {id, label, done} ] }
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
        const { platformId, label } = action.payload;
        const newItem = {
          id: `custom_${Date.now()}`,
          label,
          done: false,
          custom: true,
        };
      
        if (!state.progress[platformId]) {
          state.progress[platformId] = [];
        }
      
        state.progress[platformId].push(newItem);
      },
    selectPlatforms: (state, action) => {
      state.selectedPlatforms = action.payload;
      state.progress = {};
      action.payload.forEach(platformId => {
        const platform = platforms.find(p => p.id === platformId);
        if (platform) {
          state.progress[platformId] = platform.checklist.map(item => ({
            ...item,
          }));
        }
      });
    },
    toggleChecklistItem: (state, action) => {
      const { platformId, itemId } = action.payload;
      const checklist = state.progress[platformId];
      const item = checklist.find(i => i.id === itemId);
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
} = checklistSlice.actions;

export default checklistSlice.reducer;
