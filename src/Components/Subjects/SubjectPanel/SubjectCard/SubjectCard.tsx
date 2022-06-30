import React from 'react';
import { MouseEvent } from 'react';
import { ReactComponent as IconClose } from '../../../../assets/icons/close.svg';

import { Subject } from '../../../../Types/Subject';

import './SubjectCard.scss';

type Props = {
  subject: Subject;
  side: string;
  onClick: (subject: Subject) => void;
  onDeleteSubject: (subject: Subject) => void;
};

const SubjectCard = ({ subject, side, onClick, onDeleteSubject }: Props) => {
  const onSubjectClick = () => {
    onClick(subject);
  };

  const onDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDeleteSubject(subject);
  };

  return (
    <div className={`subject-card ${side}`} onClick={onSubjectClick}>
      <div className='subject-card__color-box' style={{ backgroundColor: subject.colorCode }}>
        <div className='subject-card__delete-subject' onClick={onDeleteClick}>
          <IconClose className='subject-card__delete-icon' />
        </div>
      </div>
      <h4 className='subject-card__name'>{subject.name}</h4>
    </div>
  );
};

export default SubjectCard;
