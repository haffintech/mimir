import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedSession } from '../../Types/Session';
import { deleteSubject } from '../subjects/subjectsSlice';
import { deleteTopic } from '../topics/topicsSlice';
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
  const sessionToDelete = state.savedSessions.filter(
    (session) => session.id === action.payload.id
  )[0];
  if (sessionToDelete) {
    const index = state.savedSessions.indexOf(sessionToDelete);
    state.savedSessions.splice(index, 1);
  }
};

const savedSessionsSlice = createSlice({
  name: 'savedSessions',
  initialState,
  reducers: {
    addSavedSession: addSavedSessionReducer,
    deleteSavedSession: deleteSavedSessionReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSubject, (state, action) => {
      const sessionsToDelete = state.savedSessions.filter(
        (session) => session.subjectId === action.payload.id
      );
      sessionsToDelete.forEach((session) => {
        const index = state.savedSessions.indexOf(session);
        if (index < 0) console.log('saved session to delete not found');
        else state.savedSessions.splice(index, 1);
      });
    });
    builder.addCase(deleteTopic, (state, action) => {
      const sessionsToDelete = state.savedSessions.filter(
        (session) => session.topicId === action.payload.id
      );
      sessionsToDelete.forEach((session) => {
        const index = state.savedSessions.indexOf(session);
        if (index < 0) console.log('saved session to delete not found');
        else state.savedSessions.splice(index, 1);
      });
    });
  },
});

export const { addSavedSession, deleteSavedSession } = savedSessionsSlice.actions;

export default savedSessionsSlice.reducer;
