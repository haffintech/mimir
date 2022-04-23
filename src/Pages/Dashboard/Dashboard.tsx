import React from 'react';

import Subjects from '../../Components/Subjects/Subjects';

import { mockSubjects } from '../../mockdata';

import './Dashboard.scss';

type Props = {
  content: {
    subjects: {
      headline: string;
      addSubject: string;
      addSubjects: {
        nameLabel: string;
        colorLabel: string;
        cancel: string;
        saveSubject: string;
        colorCodes: string[];
      };
    };
  };
};

const Dashboard = ({ content }: Props) => {
  return (
    <div className='dashboard'>
      <Subjects content={content.subjects} subjects={mockSubjects} />
    </div>
  );
};

export default Dashboard;
