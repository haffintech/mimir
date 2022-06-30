import * as React from 'react';

import TopicCard from './TopicCard/TopicCard';

import { useSelector } from 'react-redux';

import { RootState } from '../../reduxSetup/store';
import { SavedSession, ScheduledSession } from '../../Types/Session';
import { Topic } from '../../Types/Topic';

import './TopicPanel.scss';

type Props = {
  subjectId: string;
  content: {
    placeholder: string;
    topicCards: {
      totalRevisionsLabel: string;
      techniqueLabel: string;
      dueLabel: string;
      rescheduleButton: string;
      addSessionButton: string;
    };
  };
  onTopicClick: (topic: Topic) => void;
  onDeleteTopic: (topic: Topic) => void;
};

export type TopicCardData = {
  topic: Topic;
  nextSession: ScheduledSession;
  revisionCount: number;
};

const TopicPanel = ({ subjectId, content, onTopicClick, onDeleteTopic }: Props) => {
  const topics = useSelector((state: RootState) => state.topics.topics);
  const scheduledSessions = useSelector(
    (state: RootState) => state.scheduledSessions.scheduledSessions
  );
  const savedSessions = useSelector((state: RootState) => state.savedSessions.savedSessions);

  const currentTopics = topics.filter((topic) => topic.subjectId === subjectId);

  const topicCardData: TopicCardData[] = getTopicCardData({
    topics: currentTopics,
    scheduledSessions,
    savedSessions,
  });
  const topicCards = topicCardData.map((data) => {
    return (
      <TopicCard
        key={data.topic.id}
        data={data}
        content={content.topicCards}
        onTopicClick={onTopicClick}
        onDeleteTopic={onDeleteTopic}
      />
    );
  });

  if (topicCards.length < 1) {
    return <div className='topic-panel'>{content.placeholder}</div>;
  }

  return <div className='topic-panel'>{topicCards}</div>;
};

export default TopicPanel;

type Params = {
  topics: Topic[];
  scheduledSessions: ScheduledSession[];
  savedSessions: SavedSession[];
};

function getTopicCardData({ topics, scheduledSessions, savedSessions }: Params): TopicCardData[] {
  const data = topics.map((topic) => {
    const topicScheduledSessions = scheduledSessions.filter(
      (session) => session.topicId === topic.id
    );
    const nextSession = getNextSession(topicScheduledSessions);

    const topicSavedSessions = savedSessions.filter((session) => session.topicId === topic.id);
    const revisionCount = topicSavedSessions.length;

    return {
      topic,
      nextSession,
      revisionCount,
    };
  });

  return data;
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
