import * as React from 'react';
import { SavedSession } from '../../../Types/Session';

import './SessionCard.scss';

type Props = {
  session: SavedSession;
  content: {
    datePrefix: string;
    retentionSuffix: string;
    feedbackLabel: string;
  };
};

const SessionCard = ({ content, session }: Props) => {
  const dateString = new Date(session.date).toLocaleDateString();

  return (
    <div className='session-card'>
      <h6 className='session-card__headline'>{session.learningTechnique}</h6>
      <p className='session-card__date'>{`${content.datePrefix} ${dateString}`}</p>
      <p className='session-card__retention'>{`${session.retention} ${content.retentionSuffix}`}</p>
      <p className='session-card__feedback-label'>
        <strong>{content.feedbackLabel}</strong>
      </p>
      <p className='session-card__personal-feedback'>{session.feedback}</p>
    </div>
  );
};

export default SessionCard;
