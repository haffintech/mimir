import * as React from 'react';

import { learningTechniques } from '../../utils/misc/learningTechniques';

import './TopicStats.scss';

type Props = {
  content: {
    revisionsLabel: string;
    nextRevisionLabel: string;
    suggestedTechniqueA: string;
    suggestedTechniqueB: string;
  };
  topicData: {
    countRevisions: number;
    nextRevision: Date;
    nextTechnique: number;
  };
};

const TopicStats = ({ content, topicData }: Props) => {
  const dateString = topicData.nextRevision.toLocaleDateString();

  const learningTechnique = learningTechniques.filter(
    (technique) => technique.id === topicData.nextTechnique
  );

  return (
    <div className='topic-stats'>
      <p className='topic-stats__revisions'>{`${content.revisionsLabel} ${topicData.countRevisions}`}</p>
      <p className='topic-stats__next-revision'>{`${content.nextRevisionLabel} ${dateString}`}</p>
      <p className='topic-stats__suggested-technique'>
        {content.suggestedTechniqueA}
        <strong>{learningTechnique[0].name}</strong>
        {content.suggestedTechniqueB}
      </p>
    </div>
  );
};

export default TopicStats;
