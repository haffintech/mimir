import * as React from 'react';
import classNames from 'classnames';

import './RetentionButton.scss';

type Props = {
  index: number;
  text: string;
  isSelected: boolean;
  onClick: (index: number) => void;
};

const RetentionButton = ({ index, text, isSelected, onClick }: Props) => {
  const onButtonClick = () => {
    onClick(index);
  };

  const className = classNames({
    'retention-button': true,
    'retention-button--is-selected': isSelected,
  });

  return (
    <button className={className} onClick={onButtonClick}>
      {text}
    </button>
  );
};

export default RetentionButton;
