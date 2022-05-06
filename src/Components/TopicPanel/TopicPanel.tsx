import * as React from 'react';

import TopicCard from './TopicCard/TopicCard';

import { useSelector } from 'react-redux';

import { RootState } from '../../reduxSetup/store';
import './TopicPanel.scss';
import { ScheduledSession } from '../../Types/Session';
import { Topic } from '../../Types/Topic';

type Props = {
  subjectId: string;
  content: {
    topicCards: {
      totalRevisionsLabel: string;
      techniqueLabel: string;
      dueLabel: string;
      rescheduleButton: string;
      addSessionButton: string;
    };
  };
};

type TopicSessionMapping = {
  topic: Topic;
  nextSession: ScheduledSession;
};

const TopicPanel = ({ subjectId, content }: Props) => {
  const topics = useSelector((state: RootState) => state.topics.topics);
  const scheduledSessions = useSelector(
    (state: RootState) => state.scheduledSessions.scheduledSessions
  );

  const currentTopics = topics.filter((topic) => topic.subjectId === subjectId);

  const topicSessionMappings: TopicSessionMapping[] = getTopicSessionMappings(
    currentTopics,
    scheduledSessions
  );
  const topicCards = topicSessionMappings.map((mapping) => {
    return (
      <TopicCard
        key={mapping.topic.id}
        topic={mapping.topic}
        nextSession={mapping.nextSession}
        content={content.topicCards}
      />
    );
  });

  return <div className='topic-panel'>{topicCards}</div>;
};

export default TopicPanel;

function getTopicSessionMappings(
  topics: Topic[],
  sessions: ScheduledSession[]
): TopicSessionMapping[] {
  const mappings = topics.map((topic) => {
    const mappedSessions = sessions.filter((session) => session.topicId === topic.id);
    const nextSession = getNextSession(mappedSessions);
    return {
      topic,
      nextSession,
    };
  });
  return mappings;
}

function getNextSession(sessions: ScheduledSession[]) {
  const compareSessionDates = (a: ScheduledSession, b: ScheduledSession) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  };
  const sortedSessions = sessions.sort(compareSessionDates);
  return sortedSessions[0];
}
