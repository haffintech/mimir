import React from 'react';

import SubjectsPanel from './SubjectPanel/SubjectsPanel';

import Subject from '../../Types/Subject';

import './Subjects.scss';

type Props = {
  content: {
    subjectsPanel: {
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

const Subjects = (props: Props) => {
  return (
    <div className='subjects'>
      <SubjectsPanel content={props.content.subjectsPanel} subjects={props.subjects} />
    </div>
  );
};

export default Subjects;
