import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedSession } from '../../Types/Session';

interface savedSessionsState {
  savedSessions: SavedSession[];
}

const initialState: savedSessionsState = {
  savedSessions: [],
};

/* reducers */
const addSavedSessionReducer = (state: savedSessionsState, action: PayloadAction<SavedSession>) => {
  state.savedSessions.push(action.payload);
};

const deleteSavedSessionReducer = (
  state: savedSessionsState,
  action: PayloadAction<SavedSession>
) => {
  const index = state.savedSessions.indexOf(action.payload);
  if (index > -1) state.savedSessions.splice(index, 1);
};

const savedSessionsSlice = createSlice({
  name: 'savedSessions',
  initialState,
  reducers: {
    addSavedSession: addSavedSessionReducer,
    deleteSavedSession: deleteSavedSessionReducer,
  },
});

export const { addSavedSession, deleteSavedSession } = savedSessionsSlice.actions;

export default savedSessionsSlice.reducer;
