import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Topic } from '../../Types/Topic';

import { deleteSubject } from '../subjects/subjectsSlice';
import { addSavedSession, deleteSavedSession } from '../savedSessions/savedSessionSlice';

import { getNewTopicLeitnerBox } from './../../utils/misc/sessionScheduling';
interface TopicsState {
  topics: Topic[];
}

const initialState: TopicsState = {
  topics: [],
};

/* reducers */
const addTopicReducer = (state: TopicsState, action: PayloadAction<Topic>) => {
  state.topics.push(action.payload);
};

const deleteTopicReducer = (state: TopicsState, action: PayloadAction<Topic>) => {
  const topicToDelete = state.topics.filter((topic) => topic.id === action.payload.id)[0];
  if (topicToDelete) {
    const index = state.topics.indexOf(topicToDelete);
    state.topics.splice(index, 1);
  }
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: addTopicReducer,
    deleteTopic: deleteTopicReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteSubject, (state, action) => {
      const topicsToDelete = state.topics.filter((topic) => topic.subjectId === action.payload.id);
      topicsToDelete.forEach((topic) => {
        const index = state.topics.indexOf(topic);
        if (index < 0) console.log('topic to delete not found');
        else state.topics.splice(index, 1);
      });
    });
    builder.addCase(addSavedSession, (state, action) => {
      const sessionTopic = state.topics.filter((topic) => topic.id === action.payload.topicId)[0];
      const index = state.topics.indexOf(sessionTopic);
      const newTopic = {
        ...sessionTopic,
        leitnerBox: getNewTopicLeitnerBox(sessionTopic, action.payload),
      };
      state.topics.splice(index, 1, newTopic);
    });
    builder.addCase(deleteSavedSession, (state, action) => {
      const sessionTopic = state.topics.filter((topic) => topic.id === action.payload.topicId)[0];
      const index = state.topics.indexOf(sessionTopic);
      const newTopic = { ...sessionTopic, leitnerBox: sessionTopic.leitnerBox - 1 };
      state.topics.splice(index, 1, newTopic);
    });
  },
});

export const { addTopic, deleteTopic } = topicsSlice.actions;

export default topicsSlice.reducer;
