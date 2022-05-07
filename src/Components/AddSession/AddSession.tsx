import * as React from 'react';
import { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from 'react-date-picker';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Button from 'react-bootstrap/Button';

import RetentionButton from './RetentionButton/RetentionButton';

import './AddSession.scss';

type Props = {
  content: {
    headline: string;
    dateLabel: string;
    feedbackLabel: string;
    techniqueLabel: string;
    retentionLabel: string;
    cancelButton: string;
    saveButton: string;
    retentionButtons: {
      value: string;
      text: string;
    }[];
  };
  onClose: () => void;
};

const AddSession = ({ content, onClose }: Props) => {
  const initialButtonSelectionStates = content.retentionButtons.map((item) => false);

  const [retentionValue, setRetentionValue] = useState<string | undefined>();
  const [areButtonsSelected, setAreButtonsSelected] = useState<boolean[]>(
    initialButtonSelectionStates
  );

  const onRetentionButtonClick = (index: number) => {
    setRetentionValue(content.retentionButtons[index].value);
    const newButtonSelections = initialButtonSelectionStates;
    newButtonSelections[index] = true;
    setAreButtonsSelected(newButtonSelections);
  };

  const retentionButtons = content.retentionButtons.map((button, idx) => {
    return (
      <RetentionButton
        key={button.value}
        index={idx}
        text={button.text}
        isSelected={areButtonsSelected[idx]}
        onClick={onRetentionButtonClick}
      />
    );
  });

  return (
    <div className='add-session'>
      <h4 className='add-session__headline'>{content.headline}</h4>
      <p className='add-session__label'>{content.dateLabel}</p>
      <DatePicker className='add-session__date-picker' />
      <p className='add-session__label'>{content.feedbackLabel}</p>
      <FormControl className='add-session__feedback-input' as='textarea'></FormControl>
      <p className='add-session__label'>{content.techniqueLabel}</p>
      <DropdownButton
        className='add-session__technique-dropdown'
        title='Select learning technique'
        variant='outline-secondary'
      >
        <DropdownItem>1</DropdownItem>
        <DropdownItem>2</DropdownItem>
        <DropdownItem>3</DropdownItem>
      </DropdownButton>
      <p className='add-session__label'>{content.retentionLabel}</p>
      <div className='add-session__retention-buttons'>{retentionButtons}</div>
      <div className='add-session__button-container'>
        <Button variant='outline-secondary' onClick={onClose}>
          {content.cancelButton}
        </Button>
        <Button>{content.saveButton}</Button>
      </div>
    </div>
  );
};

export default AddSession;
