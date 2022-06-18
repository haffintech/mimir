import { getSavedAppState } from './../utils/storageHelper';
import { storageMiddleware } from './storageMiddleware';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
  preloadedState: getSavedAppState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
