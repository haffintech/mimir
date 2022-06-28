import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduledSession } from '../../Types/Session';
import { deleteSubject } from '../subjects/subjectsSlice';

interface scheduledSessionsState {
  scheduledSessions: ScheduledSession[];
}

const initialState: scheduledSessionsState = {
  scheduledSessions: [],
};

/* reducers */
const addScheduledSessionReducer = (
  state: scheduledSessionsState,
  action: PayloadAction<ScheduledSession>
) => {
  state.scheduledSessions.push(action.payload);
};

const deleteScheduledSessionReducer = (
  state: scheduledSessionsState,
  action: PayloadAction<ScheduledSession>
) => {
  const sessionToDelete = state.scheduledSessions.filter(
    (session) => session.id === action.payload.id
  )[0];
  if (sessionToDelete) {
    const index = state.scheduledSessions.indexOf(sessionToDelete);
    state.scheduledSessions.splice(index, 1);
  }
};

const scheduledSessionsSlice = createSlice({
  name: 'scheduledSessions',
  initialState,
  reducers: {
    addScheduledSession: addScheduledSessionReducer,
    deleteScheduledSession: deleteScheduledSessionReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSubject, (state, action) => {
      const sessionsToDelete = state.scheduledSessions.filter(
        (session) => session.subjectId === action.payload.id
      );
      sessionsToDelete.forEach((session) => {
        const index = state.scheduledSessions.indexOf(session);
        if (index < 0) console.log('scheduled session to delete not found');
        else state.scheduledSessions.splice(index, 1);
      });
    });
  },
});

export const { addScheduledSession, deleteScheduledSession } = scheduledSessionsSlice.actions;

export default scheduledSessionsSlice.reducer;
