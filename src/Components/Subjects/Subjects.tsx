import React from 'react';

import SubjectsDisplayer from './SubjectDisplayer/SubjectsDisplayer';

import Subject from '../../Types/Subject';

import './Subjects.scss';

type props = {
  content: {
    subjectsDisplayer: {
      headline: string;
      addSubject: string;
    };
    addSubject: {
      nameLabel: string;
      colorLabel: string;
      cancel: string;
      saveSubject: string;
    };
  };
  subjects: Subject[];
};

const Subjects = (props: props) => {
  return (
    <div className='subjects'>
      <SubjectsDisplayer content={props.content.subjectsDisplayer} subjects={props.subjects} />
    </div>
  );
};

export default Subjects;
