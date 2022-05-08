import * as React from 'react';
import { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './AddTopic.scss';

type Props = {
  content: {
    headline: string;
    nameLabel: string;
    cancelButton: string;
    saveButton: string;
  };
  onCancel: () => void;
  onSave: (name: string) => void;
};

const AddTopic = ({ content, onCancel, onSave }: Props) => {
  const [name, setName] = useState<string>('');

  const onSaveClick = () => {
    if (name) {
      onSave(name);
      setName('');
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className='add-topic'>
      <h4 className='add-topic__headline'>{content.headline}</h4>
      <p className='add-topic__name-label'>{content.nameLabel}</p>
      <FormControl value={name} type='string' onChange={onInputChange} />
      <div className='add-topic__button-container'>
        <Button size='sm' variant='outline-secondary' onClick={onCancel}>
          {content.cancelButton}
        </Button>
        <Button size='sm' onClick={onSaveClick}>
          {content.saveButton}
        </Button>
      </div>
    </div>
  );
};

export default AddTopic;
