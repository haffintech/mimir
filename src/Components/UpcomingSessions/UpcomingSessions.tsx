import * as React from 'react';

import SessionCard from './SessionCard/SessionCard';

import { ScheduledSession } from '../../Types/Session';

import { RootState } from '../../reduxSetup/store';
import { useAppSelector } from '../../reduxSetup/hooks';

import './UpcomingSessions.scss';

type Props = {
  content: {
    headline: string;
    placeholder: string;
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
  const topics = useAppSelector((state: RootState) => state.topics.topics);
  const isPlaceholderVisible = upcomingSessions.length < 1;

  const sessionCards = upcomingSessions.map((session) => {
    const sessionSubject = subjects.filter((subject) => subject.id === session.subjectId);
    const subjectName = sessionSubject[0].name;

    const sessionTopic = topics.filter((topic) => topic.id === session.topicId);
    const topicName = sessionTopic[0].name;

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
      {isPlaceholderVisible && (
        <p className='upcoming-sessions__placeholder'>{content.placeholder}</p>
      )}
      {!isPlaceholderVisible && (
        <div className='upcoming-sessions__card-container'>{sessionCards}</div>
      )}
    </div>
  );
};

export default UpcomingSessions;
