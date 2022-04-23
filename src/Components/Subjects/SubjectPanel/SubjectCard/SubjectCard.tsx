import React from 'react';

import { ReactComponent as IconPlus } from '../../../../assets/icons/plus.svg';

import Subject from '../../../../Types/Subject';

import './SubjectCard.scss';

type Props = {
  subject: Subject;
  side: string;
  isAddSubject?: boolean;
  onClick: (id: string) => void;
};

const SubjectCard = (props: Props) => {
  const onClick = () => {
    props.onClick(props.subject.id);
  };

  return (
    <div className={`subject-card ${props.side}`} onClick={onClick}>
      <div className='subject-card__color-box' style={{ backgroundColor: props.subject.colorCode }}>
        {props.isAddSubject && <IconPlus className='subject-card__plus-icon' />}
      </div>
      <h4 className='subject-card__name'>{props.subject.name}</h4>
    </div>
  );
};

export default SubjectCard;
