import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import TopicStats from '../../Components/TopicStats/TopicStats';
import PastSessions from '../../Components/PastSessions/PastSessions';
import AddSession from '../../Components/AddSession/AddSession';

import { useAppSelector } from '../../reduxSetup/hooks';
import { useAppDispatch } from '../../reduxSetup/hooks';
import {
  addSavedSession,
  deleteSavedSession,
} from '../../stateSlices/savedSessions/savedSessionSlice';

import useViewportResize from '../../utils/hooks/useViewportResize';
import { getUniqueId } from '../../utils/misc/idGenerator';

import { breakpoints } from '../../utils/misc/breakpoints';
import { RootState } from '../../reduxSetup/store';

import './TopicDetails.scss';
import { LearningTechnique } from '../../utils/misc/learningTechniques';
import { SavedSession } from '../../Types/Session';

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
      placeholder: string;
      cards: {
        datePrefix: string;
        retentionSuffix: string;
        feedbackLabel: string;
      };
    };
    addSession: {
      headline: string;
      dateLabel: string;
      feedbackLabel: string;
      techniqueLabel: string;
      dropdownPlaceholder: string;
      retentionLabel: string;
      cancelButton: string;
      saveButton: string;
      retentionButtons: {
        value: string;
        text: string;
      }[];
    };
  };
};

const TopicDetails = ({ content }: Props) => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { width } = useViewportResize();
  const isMobile = width < breakpoints.md;

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
    nextTechnique: nextSession.learningTechnique,
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onAddSession = (
    sessionDate: Date,
    feedback: string,
    learningTechnique: LearningTechnique,
    retention: number
  ) => {
    const date = sessionDate.toISOString();
    const session = {
      id: getUniqueId(),
      subjectId: currentTopic.subjectId,
      topicId: currentTopic.id,
      date,
      feedback,
      learningTechnique: learningTechnique.id,
      retention,
    };

    dispatch(addSavedSession(session));
  };

  const onDeleteSession = (session: SavedSession) => {
    dispatch(deleteSavedSession(session));
  };

  return (
    <div className='topic-details'>
      <h2 className='topic-details__headline'>{currentTopic.name}</h2>
      <div className='topic-details__container'>
        <div className='topic-details__stats-container'>
          <h4 className='topic-details__stats-headline'>{content.topicStats.headline}</h4>
          <TopicStats content={content.topicStats} topicData={topicData} />
        </div>

        {isMobile && (
          <Button className='topic-details__add-session-button' onClick={toggleModal}>
            {content.addSessionButton}
          </Button>
        )}
        <div className='topic-details__past-sessions-container'>
          <h4 className='topic-details__past-sessions-headline'>
            {content.pastRevisions.headline}
          </h4>
          <PastSessions
            content={content.pastRevisions}
            sessions={topicSessions}
            onDeleteSession={onDeleteSession}
          />
        </div>
        {isMobile && (
          <Modal centered show={isModalOpen} onHide={toggleModal}>
            <AddSession
              content={content.addSession}
              onClose={toggleModal}
              onAddSession={onAddSession}
            />
          </Modal>
        )}
        <div className='topic-details__add-session-container'>
          <h4 className='topic-details__add-session-headline'>{content.addSession.headline}</h4>
          <AddSession
            content={content.addSession}
            onClose={toggleModal}
            onAddSession={onAddSession}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;
