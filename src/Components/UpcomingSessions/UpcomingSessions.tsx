import * as React from 'react';

import SessionCard from './SessionCard/SessionCard';

import { scheduledSession } from '../../Types/Session';

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
  upcomingSessions: scheduledSession[];
};

const UpcomingSessions = ({ content, upcomingSessions }: Props) => {
  const sessionCards = upcomingSessions.map((session) => {
    return <SessionCard key={session.id} session={session} content={content.sessionCardContent} />;
  });
  return (
    <div className='upcoming-sessions'>
      <h2 className='upcoming-sessions__headline'>{content.headline}</h2>
      <div className='upcoming-sessions__card-container'>{sessionCards}</div>
    </div>
  );
};

export default UpcomingSessions;
