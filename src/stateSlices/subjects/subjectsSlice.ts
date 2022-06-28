import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Subject } from '../../Types/Subject';

interface SubjectsState {
  subjects: Subject[];
}

const initialState: SubjectsState = {
  subjects: [],
};

/* reducers */
const addSubjectReducer = (state: SubjectsState, action: PayloadAction<Subject>) => {
  state.subjects.push(action.payload);
};

const deleteSubjectReducer = (state: SubjectsState, action: PayloadAction<Subject>) => {
  const subjectToDelete = state.subjects.filter((subject) => subject.id === action.payload.id)[0];
  if (subjectToDelete) {
    const index = state.subjects.indexOf(subjectToDelete);
    state.subjects.splice(index, 1);
  }
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    addSubject: addSubjectReducer,
    deleteSubject: deleteSubjectReducer,
  },
});

export const { addSubject, deleteSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;
