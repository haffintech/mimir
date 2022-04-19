import React from 'react';

import { ReactComponent as IconPlus } from '../../../../assets/icons/plus.svg';

import Subject from '../../../../Types/Subject';

import './SubjectCard.scss';

type props = {
  subject: Subject;
  side: string;
  isAddSubject?: boolean;
};

const SubjectCard = (props: props) => {
  return (
    <div className={`subject-card ${props.side}`}>
      <div className='subject-card__color-box' style={{ backgroundColor: props.subject.colorCode }}>
        {props.isAddSubject && <IconPlus className='subject-card__plus-icon' />}
      </div>
      <h4 className='subject-card__name'>{props.subject.name}</h4>
    </div>
  );
};

export default SubjectCard;
