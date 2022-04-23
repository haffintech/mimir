import React from 'react';

import Subjects from '../../Components/Subjects/Subjects';
import UpcomingSessions from '../../Components/UpcomingSessions/UpcomingSessions';

import useViewportResize from '../../utils/hooks/useViewportResize';
import { breakpoints } from '../../utils/misc/breakpoints';

import { mockSubjects, mockScheduledSessions } from '../../mockdata';

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
    upcomingSessions: {
      headline: string;
      sessionCardContent: {
        reschedule: string;
        addSessionNow: string;
        recommendedTechnique: string;
      };
    };
    learningTechniques: {
      id: string;
      name: string;
    }[];
  };
};

const Dashboard = ({ content }: Props) => {
  const { width } = useViewportResize();
  const isMobile = width < breakpoints.md;

  if (isMobile) {
    return (
      <div className='dashboard'>
        <Subjects content={content.subjects} subjects={mockSubjects} />
      </div>
    );
  }
  return (
    <div className='dashboard'>
      <div className='dashboard__subjects-container'>
        <Subjects content={content.subjects} subjects={mockSubjects} />
      </div>

      <UpcomingSessions
        content={{ ...content.upcomingSessions, learningTechniques: content.learningTechniques }}
        upcomingSessions={mockScheduledSessions}
      />
    </div>
  );
};

export default Dashboard;
