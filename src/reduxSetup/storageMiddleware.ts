import { addSubject, deleteSubject } from '../stateSlices/subjects/subjectsSlice';
import { addTopic, deleteTopic } from '../stateSlices/topics/topicsSlice';
import {
  addSavedSession,
  deleteSavedSession,
} from '../stateSlices/savedSessions/savedSessionSlice';
import {
  addScheduledSession,
  deleteScheduledSession,
} from '../stateSlices/scheduledSessions/scheduledSessionsSlice';
import { saveAppState } from '../utils/storageHelper';

export const storageMiddleware =
  ({ getState }: any) =>
  (next: any) =>
  (action: any) => {
    const result = next(action);
    if (addSubject.match(action) || deleteSubject.match(action)) {
      saveAppState(getState());
    }
    if (addTopic.match(action) || deleteTopic.match(action)) {
      saveAppState(getState());
    }
    if (addSavedSession.match(action) || deleteSavedSession.match(action)) {
      saveAppState(getState());
    }
    if (addScheduledSession.match(action) || deleteScheduledSession.match(action)) {
      saveAppState(getState());
    }
    return result;
  };
