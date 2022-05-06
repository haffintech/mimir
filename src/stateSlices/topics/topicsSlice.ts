import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockTopics } from '../../mockdata';
import { Topic } from '../../Types/Topic';

interface TopicsState {
  topics: Topic[];
}

const initialState: TopicsState = {
  topics: mockTopics,
};

/* reducers */
const addTopicReducer = (state: TopicsState, action: PayloadAction<Topic>) => {
  state.topics.push(action.payload);
};

const deleteTopicReducer = (state: TopicsState, action: PayloadAction<Topic>) => {
  const index = state.topics.indexOf(action.payload);
  if (index > -1) state.topics.splice(index, 1);
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    addTopic: addTopicReducer,
    deleteTopic: deleteTopicReducer,
  },
});

export const { addTopic, deleteTopic } = topicsSlice.actions;

export default topicsSlice.reducer;
