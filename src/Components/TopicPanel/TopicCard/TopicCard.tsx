import * as React from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';

import { learningTechniques } from '../../../utils/misc/learningTechniques';
import { ScheduledSession } from '../../../Types/Session';
import { Topic } from '../../../Types/Topic';

import './TopicCard.scss';

type Props = {
  content: {
    totalRevisionsLabel: string;
    techniqueLabel: string;
    dueLabel: string;
    rescheduleButton: string;
    addSessionButton: string;
  };
  topic: Topic;
  nextSession: ScheduledSession;
  onTopicClick: (topic: Topic) => void;
};

const TopicCard = ({ content, topic, nextSession, onTopicClick }: Props) => {
  const today = new Date().getTime();
  const sessionDate = new Date(nextSession.date).getTime();
  const isSessionDue = today > sessionDate;

  const formattedSessionDate = getFormattedDate(nextSession.date);

  const dueDateClassName = classNames({
    'topic__due-date': true,
    'topic__due-date--is-due': isSessionDue,
  });

  const onClick = () => {
    onTopicClick(topic);
  };

  const onReschedule = () => {
    console.log('reschedule');
  };

  const onAddSession = () => {
    console.log('add session');
  };

  const learningTechnique = learningTechniques.filter(
    (technique) => technique.id === nextSession.learningTechnique
  );

  return (
    <div className='topic'>
      <div className='topic__container' onClick={onClick}>
        <h4 className='topic__name'>{topic.name}</h4>
        <p className='topic__total-revisions'>{content.totalRevisionsLabel}</p>
        <p className='topic__technique-label'>{content.techniqueLabel}</p>
        <p className='topic__next-technique'>{learningTechnique[0].name}</p>
        <p className={dueDateClassName}>{`${content.dueLabel} ${formattedSessionDate}`}</p>
      </div>
      <div className='topic__button-container'>
        <Button
          size='sm'
          variant='outline-secondary'
          className='topic__reschedule-button'
          onClick={onReschedule}
        >
          {content.rescheduleButton}
        </Button>
        <Button size='sm' className='topic__add-session-button' onClick={onAddSession}>
          {content.addSessionButton}
        </Button>
      </div>
    </div>
  );
};

export default TopicCard;

function getFormattedDate(sessionDate: string): string {
  const date = new Date(sessionDate);
  const formattedDate = `${date.toLocaleDateString()}`;
  return formattedDate;
}
