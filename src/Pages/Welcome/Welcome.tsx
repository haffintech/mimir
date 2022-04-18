import React from 'react';
import Button from 'react-bootstrap/Button';

import './Welcome.scss';

type props = {
  content: {
    headline: string;
    teaser: string;
    cta: string;
    login: string;
    signup: string;
  };
};

const Welcome = (props: props) => {
  return (
    <div className='welcome'>
      <h2 className='welcome__headline'>{props.content.headline}</h2>
      <p className='welcome__teaser'>{props.content.teaser}</p>
      <h2 className='welcome__cta'>{props.content.cta}</h2>
      <div className='welcome__buttons'>
        <Button variant='outline-secondary' className='welcome__login'>
          {props.content.login}
        </Button>
        <Button className='welcome__signup'>{props.content.signup}</Button>
      </div>
    </div>
  );
};

export default Welcome;
