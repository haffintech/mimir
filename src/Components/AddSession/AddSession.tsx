import * as React from 'react';
import { useState, useEffect } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from 'react-date-picker';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Button from 'react-bootstrap/Button';

import RetentionButton from './RetentionButton/RetentionButton';

import { LearningTechnique, learningTechniques } from '../../utils/misc/learningTechniques';

import './AddSession.scss';

type Props = {
  content: {
    headline: string;
    dateLabel: string;
    feedbackLabel: string;
    techniqueLabel: string;
    dropdownPlaceholder: string;
    retentionLabel: string;
    cancelButton: string;
    saveButton: string;
    retentionButtons: {
      value: string;
      text: string;
    }[];
  };
  onClose: () => void;
  onAddSession: (
    sessionDate: Date,
    feedback: string,
    learningTechnique: LearningTechnique,
    retention: number
  ) => void;
};

const AddSession = ({ content, onClose, onAddSession }: Props) => {
  const initialButtonSelectionStates = content.retentionButtons.map((item) => false);
  const [areButtonsSelected, setAreButtonsSelected] = useState<boolean[]>(
    initialButtonSelectionStates
  );

  const [retentionValue, setRetentionValue] = useState<number>();
  const [sessionDate, setSessionDate] = useState<Date>();
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [selectedTechnique, setSelectedTechnique] = useState<LearningTechnique>();
  const [isSaveEnabled, setIsSaveEnabled] = useState<boolean>(false);

  const [dropdownText, setDropdownText] = useState<string>(content.dropdownPlaceholder);

  useEffect(() => {
    if (retentionValue && sessionDate && feedbackText && selectedTechnique) setIsSaveEnabled(true);
    else setIsSaveEnabled(false);
  }, [retentionValue, sessionDate, feedbackText, selectedTechnique]);

  useEffect(() => {
    if (selectedTechnique) setDropdownText(selectedTechnique.name);
    else setDropdownText(content.dropdownPlaceholder);
  }, [selectedTechnique, content.dropdownPlaceholder]);

  const onTechniqueSelected = (event: any) => {
    const elementId = event.target.id;
    const techniqueId = elementId.split('-').at(-1);
    const technique = learningTechniques.filter(
      (technique) => technique.id === Number(techniqueId)
    );
    setSelectedTechnique(technique[0]);
  };

  const onRetentionButtonClick = (index: number) => {
    setRetentionValue(Number(content.retentionButtons[index].value));
    const newButtonSelections = initialButtonSelectionStates;
    newButtonSelections[index] = true;
    setAreButtonsSelected(newButtonSelections);
  };

  const onDateChange = (date: Date) => {
    setSessionDate(date);
  };

  const onFeedbackChange = (event: any) => {
    setFeedbackText(event.target.value);
  };

  const addSession = () => {
    if (sessionDate && feedbackText && selectedTechnique && retentionValue)
      onAddSession(sessionDate, feedbackText, selectedTechnique, retentionValue);
    resetValues();
  };

  const resetValues = () => {
    setFeedbackText('');
    setSelectedTechnique(undefined);
    setSessionDate(undefined);
    setRetentionValue(undefined);
    setAreButtonsSelected(initialButtonSelectionStates);
  };

  const techniqueDropdownItems = learningTechniques.map((technique) => {
    return (
      <DropdownItem
        key={technique.id}
        id={`technique-${technique.id.toString()}`}
        onClick={onTechniqueSelected}
      >
        {technique.name}
      </DropdownItem>
    );
  });

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
      <DatePicker
        className='add-session__date-picker'
        onChange={onDateChange}
        value={sessionDate}
      />
      <p className='add-session__label'>{content.feedbackLabel}</p>
      <FormControl
        className='add-session__feedback-input'
        as='textarea'
        value={feedbackText}
        onChange={onFeedbackChange}
      ></FormControl>
      <p className='add-session__label'>{content.techniqueLabel}</p>
      <DropdownButton
        className='add-session__technique-dropdown'
        title={dropdownText}
        variant='outline-secondary'
      >
        {techniqueDropdownItems}
      </DropdownButton>
      <p className='add-session__label'>{content.retentionLabel}</p>
      <div className='add-session__retention-buttons'>{retentionButtons}</div>
      <div className='add-session__button-container'>
        <Button variant='outline-secondary' onClick={onClose}>
          {content.cancelButton}
        </Button>
        <Button onClick={addSession} disabled={!isSaveEnabled}>
          {content.saveButton}
        </Button>
      </div>
    </div>
  );
};

export default AddSession;
