import { configureStore } from '@reduxjs/toolkit';
import subjectsSlice from '../stateSlices/subjects/subjectsSlice';
import scheduledSessionsSlice from '../stateSlices/scheduledSessions/scheduledSessionsSlice';
import topicsSlice from '../stateSlices/topics/topicsSlice';
import savedSessionSlice from '../stateSlices/savedSessions/savedSessionSlice';

export const store = configureStore({
  reducer: {
    subjects: subjectsSlice,
    scheduledSessions: scheduledSessionsSlice,
    topics: topicsSlice,
    savedSessions: savedSessionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
