import * as React from 'react';

import SessionCard from './SessionCard/SessionCard';

import { ScheduledSession } from '../../Types/Session';

import { RootState } from '../../reduxSetup/store';
import { useAppSelector } from '../../reduxSetup/hooks';

import './UpcomingSessions.scss';

type Props = {
  content: {
    headline: string;
    learningTechniques: {
      id: string;
      name: string;
    }[];
    sessionCardContent: {
      reschedule: string;
      addSessionNow: string;
      recommendedTechnique: string;
    };
  };
  upcomingSessions: ScheduledSession[];
};

const UpcomingSessions = ({ content, upcomingSessions }: Props) => {
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects);

  const sessionCards = upcomingSessions.map((session) => {
    const sessionSubject = subjects.filter((subject) => subject.id === session.subjectId);
    const subjectName = sessionSubject[0].name;
    const topicName = 'topic';
    return (
      <SessionCard
        key={session.id}
        session={session}
        content={content.sessionCardContent}
        topicName={topicName}
        subjectName={subjectName}
      />
    );
  });
  return (
    <div className='upcoming-sessions'>
      <h2 className='upcoming-sessions__headline'>{content.headline}</h2>
      <div className='upcoming-sessions__card-container'>{sessionCards}</div>
    </div>
  );
};

export default UpcomingSessions;
