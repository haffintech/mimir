import React from 'react';

import Subjects from '../../Components/Subjects/Subjects';
import UpcomingSessions from '../../Components/UpcomingSessions/UpcomingSessions';

import useViewportResize from '../../utils/hooks/useViewportResize';
import { breakpoints } from '../../utils/misc/breakpoints';
import { useAppSelector } from '../../reduxSetup/hooks';
import { RootState } from '../../reduxSetup/store';

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
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects);
  const upcomingSessions = useAppSelector(
    (state: RootState) => state.scheduledSessions.scheduledSessions
  );

  if (isMobile) {
    return (
      <div className='dashboard'>
        <Subjects content={content.subjects} subjects={subjects} />
      </div>
    );
  }
  return (
    <div className='dashboard'>
      <div className='dashboard__subjects-container'>
        <Subjects content={content.subjects} subjects={subjects} />
      </div>

      <UpcomingSessions
        content={{ ...content.upcomingSessions, learningTechniques: content.learningTechniques }}
        upcomingSessions={upcomingSessions}
      />
    </div>
  );
};

export default Dashboard;
