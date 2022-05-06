import * as React from 'react';

import Button from 'react-bootstrap/Button';
import TopicPanel from '../../Components/TopicPanel/TopicPanel';

import { useAppSelector } from '../../reduxSetup/hooks';
import { useParams } from 'react-router-dom';

import './TopicOverview.scss';
import { Subject } from '../../Types/Subject';
import { RootState } from '../../reduxSetup/store';

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
  };
};

const TopicOverview = ({ content }: Props) => {
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects);

  const { subjectId } = useParams();
  if (!subjectId) {
    // subject needed for displaying any topic
    return null;
  }

  const currentSubject = getCurrentSubject(subjects, subjectId);

  return (
    <div className='topic-overview'>
      <h2 className='topic-overview__headline'>{currentSubject.name}</h2>
      <Button className='topic-overview__add-button'>{content.addTopicButton}</Button>
      <TopicPanel subjectId={subjectId} content={{ topicCards: content.topicCards }} />
    </div>
  );
};

export default TopicOverview;

function getCurrentSubject(subjects: Subject[], subjectId: string): Subject {
  const filtered = subjects.filter((subject) => subject.id === subjectId);
  return filtered[0];
}
