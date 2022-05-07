import React from 'react';

import { ReactComponent as IconPlus } from '../../../../assets/icons/plus.svg';

import { Subject } from '../../../../Types/Subject';

import './SubjectCard.scss';

type Props = {
  subject: Subject;
  side: string;
  onClick: (subject: Subject) => void;
};

const SubjectCard = ({ subject, side, onClick }: Props) => {
  const onSubjectClick = () => {
    onClick(subject);
  };

  return (
    <div className={`subject-card ${side}`} onClick={onSubjectClick}>
      <div className='subject-card__color-box' style={{ backgroundColor: subject.colorCode }}></div>
      <h4 className='subject-card__name'>{subject.name}</h4>
    </div>
  );
};

export default SubjectCard;
