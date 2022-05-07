import React from 'react';
import Button from 'react-bootstrap/Button';

import SubjectCard from './SubjectCard/SubjectCard';

import { Subject } from '../../../Types/Subject';

import './SubjectsPanel.scss';

type Props = {
  subjects: Subject[];
  placeholder: {
    text: string;
    ctaText: string;
  };
  onPlaceholderClick: () => void;
  onSubjectClick: (subject: Subject) => void;
};

const SubjectsPanel = ({ subjects, onSubjectClick, placeholder, onPlaceholderClick }: Props) => {
  if (!subjects[0]) {
    return (
      <div className='subjects-panel'>
        <div className='subjects-panel__placeholder-container'>
          <p className='subjects-panel__placeholder-text'>{placeholder.text}</p>
          <Button onClick={onPlaceholderClick} variant='outline-primary'>
            {placeholder.ctaText}
          </Button>
        </div>
      </div>
    );
  }

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
