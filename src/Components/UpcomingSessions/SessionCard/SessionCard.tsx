import * as React from 'react';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';
import { scheduledSession } from '../../../Types/Session';

import './SessionCard.scss';

type Props = {
  session: scheduledSession;
  content: {
    recommendedTechnique: string;
    reschedule: string;
    addSessionNow: string;
  };
  subjectName: string;
  topicName: string;
};
const SessionCard = ({ session, content, subjectName, topicName }: Props) => {
  const dueDate = new Date(session.date);
  const dueDateClassname = classNames({
    'upcoming-session-card__due-date': true,
    'upcoming-session-card__due-date--due-past': dueDate.getTime() < new Date().getTime(),
  });
  return (
    <div className='upcoming-session-card'>
      <h3 className='upcoming-session-card__subject'>{subjectName}</h3>
      <h5 className='upcoming-session-card__topic'>{topicName}</h5>
      <p className='upcoming-session-card__technique-label'>{content.recommendedTechnique}</p>
      <p className='upcoming-session-card__technique'>{session.learningTechnique}</p>
      <p className={dueDateClassname}>{`Due ${dueDate.toLocaleDateString()}`}</p>
      <div className='upcoming-session-card__button-group'>
        <Button size='sm' variant='outline-secondary'>
          {content.reschedule}
        </Button>
        <Button size='sm'>{content.addSessionNow}</Button>
      </div>
    </div>
  );
};

export default SessionCard;
