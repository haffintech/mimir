import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
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

  const onGoToDashboard = () => {
    navigate(content.dashboardLink);
  };

  return (
    <div className='welcome'>
      <h2 className='welcome__headline'>{content.headline}</h2>
      <p className='welcome__teaser'>{content.teaser}</p>
      <h2 className='welcome__cta'>{content.cta}</h2>
      <div className='welcome__buttons'>
        <Button variant='outline-secondary' className='welcome__login' onClick={onGoToDashboard}>
          {content.blankDashboardBtn}
        </Button>
        <Button className='welcome__signup'>{content.sampleDataBtn}</Button>
      </div>
    </div>
  );
};

export default Welcome;
