import React from 'react';
import { useNavigate } from 'react-router-dom';

import Subjects from '../../Components/Subjects/Subjects';
import UpcomingSessions from '../../Components/UpcomingSessions/UpcomingSessions';

import useViewportResize from '../../utils/hooks/useViewportResize';
import { breakpoints } from '../../utils/misc/breakpoints';
import { useAppSelector } from '../../reduxSetup/hooks';
import { RootState } from '../../reduxSetup/store';

import './Dashboard.scss';
import { Subject } from '../../Types/Subject';

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
      placeholder: {
        text: string;
        ctaText: string;
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
  const navigate = useNavigate();

  const onSubjectClick = (subject: Subject) => {
    navigate(`/topics/${subject.id}`);
  };

  const { width } = useViewportResize();
  const isMobile = width < breakpoints.md;
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects);
  const upcomingSessions = useAppSelector(
    (state: RootState) => state.scheduledSessions.scheduledSessions
  );

  if (isMobile) {
    return (
      <div className='dashboard'>
        <Subjects content={content.subjects} subjects={subjects} onSubjectClick={onSubjectClick} />
      </div>
    );
  }
  return (
    <div className='dashboard'>
      <div className='dashboard__subjects-container'>
        <Subjects content={content.subjects} subjects={subjects} onSubjectClick={onSubjectClick} />
      </div>

      <UpcomingSessions
        content={{ ...content.upcomingSessions, learningTechniques: content.learningTechniques }}
        upcomingSessions={upcomingSessions}
      />
    </div>
  );
};

export default Dashboard;
