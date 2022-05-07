import * as React from 'react';

import './TopicStats.scss';

type Props = {
  content: {
    headline: string;
    revisionsLabel: string;
    nextRevisionLabel: string;
    suggestedTechniqueA: string;
    suggestedTechniqueB: string;
  };
  topicData: {
    countRevisions: number;
    nextRevision: Date;
    nextTechnique: string;
  };
};

const TopicStats = ({ content, topicData }: Props) => {
  const dateString = topicData.nextRevision.toLocaleDateString();

  return (
    <div className='topic-stats'>
      <h4 className='topic-stats__headline'>{content.headline}</h4>
      <p className='topic-stats__revisions'>{`${content.revisionsLabel} ${topicData.countRevisions}`}</p>
      <p className='topic-stats__next-revision'>{`${content.nextRevisionLabel} ${dateString}`}</p>
      <p className='topic-stats__suggested-technique'>
        {content.suggestedTechniqueA}
        <strong>{topicData.nextTechnique}</strong>
        {content.suggestedTechniqueB}
      </p>
    </div>
  );
};

export default TopicStats;
