import React from 'react';

import SubjectCard from './SubjectCard/SubjectCard';

import Subject from '../../../Types/Subject';

import './SubjectsPanel.scss';

type props = {
  content: {
    headline: string;
    addSubject: string;
  };
  subjects: Subject[];
};

const SubjectsPanel = (props: props) => {
  // subject card that is used as a button for adding a subject
  const addSubject = {
    userId: props.subjects[0].userId,
    id: 'addSubject',
    name: props.content.addSubject,
    colorCode: '#c4c4c4',
  };

  const subjectCards = props.subjects.map((subject, idx) => {
    const sideOfMobileGrid = idx % 2 === 0 ? 'left' : 'right';
    return <SubjectCard key={subject.id} subject={subject} side={sideOfMobileGrid} />;
  });

  return (
    <div className='subjects-displayer'>
      <h2 className='subjects-displayer__headline'>{props.content.headline}</h2>
      <div className='subjects-displayer__cards-container'>
        {subjectCards}
        <SubjectCard
          subject={addSubject}
          isAddSubject={true}
          side={props.subjects.length % 2 === 0 ? 'left' : 'right'}
        />
      </div>
    </div>
  );
};

export default SubjectsPanel;
