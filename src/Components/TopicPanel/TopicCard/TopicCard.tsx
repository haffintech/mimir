import * as React from 'react';
import { MouseEvent } from 'react';
import classNames from 'classnames';
import { ReactComponent as IconClose } from '../../../assets/icons/close.svg';

import { learningTechniques } from '../../../utils/misc/learningTechniques';
import { Topic } from '../../../Types/Topic';
import { TopicCardData } from '../TopicPanel';

import './TopicCard.scss';

type Props = {
  content: {
    totalRevisionsLabel: string;
    techniqueLabel: string;
    dueLabel: string;
    rescheduleButton: string;
    addSessionButton: string;
  };
  data: TopicCardData;
  onTopicClick: (topic: Topic) => void;
  onDeleteTopic: (topic: Topic) => void;
};

const TopicCard = ({ content, onTopicClick, data, onDeleteTopic }: Props) => {
  const { topic, nextSession, revisionCount } = data;
  const today = new Date().getTime();
  const sessionDate = new Date(nextSession.date).getTime();
  const isSessionDue = today > sessionDate;

  const formattedSessionDate = getFormattedDate(nextSession.date);

  const dueDateClassName = classNames({
    'topic__due-date': true,
    'topic__due-date--is-due': isSessionDue,
  });

  const onClick = () => {
    onTopicClick(topic);
  };

  const learningTechnique = learningTechniques.filter(
    (technique) => technique.id === nextSession.learningTechnique
  )[0];

  const onDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDeleteTopic(topic);
  };

  return (
    <div className='topic'>
      <div className='topic__container' onClick={onClick}>
        <div className='topic__delete-topic' onClick={onDeleteClick}>
          <IconClose className='topic__delete-icon' />
        </div>
        <h4 className='topic__name'>{topic.name}</h4>
        <p className='topic__total-revisions'>{`${content.totalRevisionsLabel} ${revisionCount}`}</p>
        <p className='topic__technique-label'>{content.techniqueLabel}</p>
        <p className='topic__next-technique'>{learningTechnique.name}</p>
        <p className={dueDateClassName}>{`${content.dueLabel} ${formattedSessionDate}`}</p>
      </div>
    </div>
  );
};

export default TopicCard;

function getFormattedDate(sessionDate: string): string {
  const date = new Date(sessionDate);
  const formattedDate = `${date.toLocaleDateString()}`;
  return formattedDate;
}
