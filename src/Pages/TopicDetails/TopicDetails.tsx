import * as React from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import TopicStats from '../../Components/TopicStats/TopicStats';
import PastSessions from '../../Components/PastSessions/PastSessions';

import { useAppSelector } from '../../reduxSetup/hooks';

import { RootState } from '../../reduxSetup/store';

import './TopicDetails.scss';

type Props = {
  content: {
    topicStats: {
      headline: string;
      revisionsLabel: string;
      nextRevisionLabel: string;
      suggestedTechniqueA: string;
      suggestedTechniqueB: string;
    };
    addSessionButton: string;
    pastRevisions: {
      headline: string;
      cards: {
        datePrefix: string;
        retentionSuffix: string;
        feedbackLabel: string;
      };
    };
  };
};

const TopicDetails = ({ content }: Props) => {
  const topics = useAppSelector((state: RootState) => state.topics.topics);
  const savedSessions = useAppSelector((state: RootState) => state.savedSessions.savedSessions);
  const scheduledSessions = useAppSelector(
    (state: RootState) => state.scheduledSessions.scheduledSessions
  );

  const { topicId } = useParams();
  const filteredTopics = topics.filter((topic) => topic.id === topicId);
  const currentTopic = filteredTopics[0];
  const topicSessions = savedSessions.filter((session) => session.topicId === currentTopic.id);
  const filteredScheduledSessions = scheduledSessions.filter(
    (session) => session.topicId === currentTopic.id
  );
  const nextSession = filteredScheduledSessions[0];

  const topicData = {
    countRevisions: topicSessions.length,
    nextRevision: new Date(nextSession.date),
    nextTechnique: nextSession.learningTechnique.toString(),
  };

  return (
    <div className='topic-details'>
      <h2 className='topic-details__headline'>{currentTopic.name}</h2>
      <TopicStats content={content.topicStats} topicData={topicData} />
      <Button className='topic-details__add-session-button'>{content.addSessionButton}</Button>
      <PastSessions content={content.pastRevisions} sessions={topicSessions} />
    </div>
  );
};

export default TopicDetails;
