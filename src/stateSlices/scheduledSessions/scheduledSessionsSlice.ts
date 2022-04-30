import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockScheduledSessions } from '../../mockdata';
import { scheduledSession } from '../../Types/Session';

interface scheduledSessionsState {
  scheduledSessions: scheduledSession[];
}

const initialState: scheduledSessionsState = {
  scheduledSessions: mockScheduledSessions,
};

/* reducers */
const addScheduledSessionReducer = (
  state: scheduledSessionsState,
  action: PayloadAction<scheduledSession>
) => {
  state.scheduledSessions.push(action.payload);
};

const deleteScheduledSessionReducer = (
  state: scheduledSessionsState,
  action: PayloadAction<scheduledSession>
) => {
  const index = state.scheduledSessions.indexOf(action.payload);
  if (index > -1) state.scheduledSessions.splice(index, 1);
};

const scheduledSessionsSlice = createSlice({
  name: 'scheduledSessions',
  initialState,
  reducers: {
    addScheduledSession: addScheduledSessionReducer,
    deleteScheduledSession: deleteScheduledSessionReducer,
  },
});

export const { addScheduledSession, deleteScheduledSession } = scheduledSessionsSlice.actions;

export default scheduledSessionsSlice.reducer;