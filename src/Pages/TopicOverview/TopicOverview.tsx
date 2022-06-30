import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../reduxSetup/hooks';

import TopicPanel from '../../Components/TopicPanel/TopicPanel';
import AddTopic from '../../Components/AddTopic/AddTopic';

import { useAppSelector } from '../../reduxSetup/hooks';
import { addTopic, deleteTopic } from '../../stateSlices/topics/topicsSlice';
import { addScheduledSession } from '../../stateSlices/scheduledSessions/scheduledSessionsSlice';

import { Subject } from '../../Types/Subject';
import { Topic } from '../../Types/Topic';
import { RootState } from '../../reduxSetup/store';

import './TopicOverview.scss';
import { getUniqueId } from '../../utils/misc/idGenerator';
import { getNextSession } from '../../utils/misc/sessionScheduling';

type Props = {
  content: {
    addTopicButton: string;
    topicCards: {
      totalRevisionsLabel: string;
      techniqueLabel: string;
      dueLabel: string;
      rescheduleButton: string;
      addSessionButton: string;
    };
    placeholder: string;
    addTopic: {
      headline: string;
      nameLabel: string;
      cancelButton: string;
      saveButton: string;
    };
  };
};

const TopicOverview = ({ content }: Props) => {
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects);
  const savedSessions = useAppSelector((state: RootState) => state.savedSessions.savedSessions);
  const dispatch = useAppDispatch();

  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { subjectId } = useParams();

  if (!subjectId) {
    // subject needed for displaying any topic
    return null;
  }

  const currentSubject = getCurrentSubject(subjects, subjectId);

  if (!currentSubject) return <p>this subject is not available</p>;

  const onTopicClick = (topic: Topic) => {
    navigate(`/topics/${subjectId}/${topic.id}`);
  };

  const togglePopper = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  const onSaveTopic = (name: string) => {
    const topic = {
      id: getUniqueId(),
      subjectId: currentSubject.id,
      name: name,
      leitnerBox: 0,
    };
    dispatch(addTopic(topic));

    const topicSessions = savedSessions.filter((session) => session.topicId === topic.id);
    const firstSession = getNextSession(topic, topicSessions);
    dispatch(addScheduledSession(firstSession));
    togglePopper();
  };

  const onDeleteTopic = (topic: Topic) => {
    dispatch(deleteTopic(topic));
  };

  return (
    <div className='topic-overview'>
      <h2 className='topic-overview__headline'>{currentSubject.name}</h2>
      <OverlayTrigger
        trigger='click'
        placement='bottom'
        show={isPopperOpen}
        overlay={
          <Popover className='subjects__popover'>
            <AddTopic content={content.addTopic} onCancel={togglePopper} onSave={onSaveTopic} />
          </Popover>
        }
      >
        <Button className='topic-overview__add-button' onClick={togglePopper}>
          {content.addTopicButton}
        </Button>
      </OverlayTrigger>
      <TopicPanel
        subjectId={subjectId}
        content={{ topicCards: content.topicCards, placeholder: content.placeholder }}
        onTopicClick={onTopicClick}
        onDeleteTopic={onDeleteTopic}
      />
    </div>
  );
};

export default TopicOverview;

function getCurrentSubject(subjects: Subject[], subjectId: string): Subject {
  const filtered = subjects.filter((subject) => subject.id === subjectId);
  return filtered[0];
}
