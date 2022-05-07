import React from 'react';

import SubjectCard from './SubjectCard/SubjectCard';

import { Subject } from '../../../Types/Subject';

import './SubjectsPanel.scss';

type Props = {
  subjects: Subject[];
  onSubjectClick: (subject: Subject) => void;
};

const SubjectsPanel = ({ subjects, onSubjectClick }: Props) => {
  const subjectCards = subjects.map((subject, idx) => {
    const sideOfMobileGrid = idx % 2 === 0 ? 'left' : 'right';
    return (
      <SubjectCard
        key={subject.id}
        subject={subject}
        side={sideOfMobileGrid}
        onClick={onSubjectClick}
      />
    );
  });

  return (
    <div className='subjects-panel'>
      <div className='subjects-panel__cards-container'>{subjectCards}</div>
    </div>
  );
};

export default SubjectsPanel;
