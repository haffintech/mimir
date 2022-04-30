import { configureStore } from '@reduxjs/toolkit';
import subjectsSlice from '../stateSlices/subjects/subjectsSlice';
import scheduledSessionsSlice from '../stateSlices/scheduledSessions/scheduledSessionsSlice';

export const store = configureStore({
  reducer: {
    subjects: subjectsSlice,
    scheduledSessions: scheduledSessionsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
