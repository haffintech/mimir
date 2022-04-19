import React from 'react';

import Subjects from '../../Components/Subjects/Subjects';

import { mockSubjects } from '../../mockdata';

import './Dashboard.scss';

type props = {
  content: {
    subjects: {
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
  };
};

const Dashboard = (props: props) => {
  return (
    <div className='dashboard'>
      <Subjects content={props.content.subjects} subjects={mockSubjects} />
    </div>
  );
};

export default Dashboard;
