import * as React from 'react';

import SessionCard from './SessionCard/SessionCard';

import { SavedSession } from '../../Types/Session';

import './PastSessions.scss';

type Props = {
  content: {
    headline: string;
    cards: {
      datePrefix: string;
      retentionSuffix: string;
      feedbackLabel: string;
    };
  };
  sessions: SavedSession[];
};

const PastSessions = ({ content, sessions }: Props) => {
  const sessionCards = sessions.map((session) => {
    return <SessionCard key={session.id} session={session} content={content.cards} />;
  });
  return (
    <div className='past-sessions'>
      <h4 className='past-sessions__headline'>{content.headline}</h4>
      <div className='past-sessions__sessions-container'>{sessionCards}</div>
    </div>
  );
};

export default PastSessions;
