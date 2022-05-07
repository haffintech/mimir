import * as React from 'react';
import { learningTechniques } from '../../../utils/misc/learningTechniques';
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

  const learningTechnique = learningTechniques.filter(
    (technique) => technique.id === session.learningTechnique
  );

  const retentionString = getRetentionPercentage(session.retention);

  return (
    <div className='session-card'>
      <h6 className='session-card__headline'>{learningTechnique[0].name}</h6>
      <p className='session-card__date'>{`${content.datePrefix} ${dateString}`}</p>
      <p className='session-card__retention'>{`${retentionString} ${content.retentionSuffix}`}</p>
      <p className='session-card__feedback-label'>
        <strong>{content.feedbackLabel}</strong>
      </p>
      <p className='session-card__personal-feedback'>{session.feedback}</p>
    </div>
  );
};

export default SessionCard;

function getRetentionPercentage(value: number): string {
  switch (value) {
    case 1:
      return '25%';
    case 2:
      return '50%';
    case 3:
      return '75%';
    case 4:
      return '100%';
    default:
      return 'invalid';
  }
}
