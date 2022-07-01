import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../reduxSetup/hooks';
import { addSubject } from '../../stateSlices/subjects/subjectsSlice';
import { addTopic } from '../../stateSlices/topics/topicsSlice';
import { addSavedSession } from '../../stateSlices/savedSessions/savedSessionSlice';
import { addScheduledSession } from '../../stateSlices/scheduledSessions/scheduledSessionsSlice';

import { mockdata } from '../../mockdata';
import { RootState } from '../../reduxSetup/store';
import { Subject } from '../../Types/Subject';
import { Topic } from '../../Types/Topic';
import { SavedSession, ScheduledSession } from '../../Types/Session';
import './Welcome.scss';

type props = {
  content: {
    headline: string;
    teaser: string;
    cta: string;
    sampleDataBtn: string;
    blankDashboardBtn: string;
    dashboardLink: string;
  };
};

const Welcome = ({ content }: props) => {
  const navigate = useNavigate();
  const subjects = useAppSelector((state: RootState) => state.subjects.subjects);
  const dispatch = useAppDispatch();
  const onGoToDashboard = () => {
    navigate(content.dashboardLink);
  };

  const onUseMockdata = () => {
    if (subjects[0]) {
      alert('You already created your own data. Please delete it before starting with mock data');
    } else {
      dispatchMockData();
      onGoToDashboard();
    }
  };

  const dispatchMockData = () => {
    mockdata.subjects.subjects.forEach((subject: Subject) => dispatch(addSubject(subject)));
    mockdata.topics.topics.forEach((topic: Topic) => dispatch(addTopic(topic)));
    mockdata.scheduledSessions.scheduledSessions.forEach((session: ScheduledSession) =>
      dispatch(addScheduledSession(session))
    );
    mockdata.savedSessions.savedSessions.forEach((session: SavedSession) =>
      dispatch(addSavedSession(session))
    );
  };

  return (
    <div className='welcome'>
      <h2 className='welcome__headline'>{content.headline}</h2>
      <p className='welcome__teaser'>{content.teaser}</p>
      <h2 className='welcome__cta'>{content.cta}</h2>
      <div className='welcome__buttons'>
        <Button
          variant='outline-secondary'
          className='welcome__go-blank-dashboard'
          onClick={onGoToDashboard}
        >
          {content.blankDashboardBtn}
        </Button>
        <Button className='welcome__use-mockdata' onClick={onUseMockdata}>
          {content.sampleDataBtn}
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
