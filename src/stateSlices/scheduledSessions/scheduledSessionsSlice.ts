import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScheduledSession } from '../../Types/Session';

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
