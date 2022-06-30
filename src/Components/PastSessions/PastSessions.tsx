import * as React from 'react';

import SessionCard from './SessionCard/SessionCard';

import { SavedSession } from '../../Types/Session';

import './PastSessions.scss';

type Props = {
  content: {
    headline: string;
    placeholder: string;
    cards: {
      datePrefix: string;
      retentionSuffix: string;
      feedbackLabel: string;
    };
  };
  sessions: SavedSession[];
  onDeleteSession: (session: SavedSession) => void;
};

const PastSessions = ({ content, sessions, onDeleteSession }: Props) => {
  const isPlaceholderVisible = sessions.length < 1;
  const sessionCards = sessions.map((session) => {
    return (
      <SessionCard
        key={session.id}
        session={session}
        content={content.cards}
        onDeleteSession={onDeleteSession}
      />
    );
  });

  return (
    <div className='past-sessions'>
      {isPlaceholderVisible && <p className='past-sessions__placeholder'>{content.placeholder}</p>}
      {!isPlaceholderVisible && (
        <div className='past-sessions__sessions-container'>{sessionCards}</div>
      )}
    </div>
  );
};

export default PastSessions;
