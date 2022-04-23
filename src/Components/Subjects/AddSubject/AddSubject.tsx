import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ColorPicker from './ColorPicker/ColorPicker';

import './AddSubject.scss';

type Props = {
  content: {
    headline: string;
    nameLabel: string;
    colorLabel: string;
    cancel: string;
    saveSubject: string;
    colorCodes: string[];
  };
  onCancel: () => void;
  onSaveSubject: () => void;
};

const AddSubject = ({ content, onCancel, onSaveSubject }: Props) => {
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  useEffect(() => {
    if (name && color) setIsFormFilled(true);
    else setIsFormFilled(false);
  }, [name, color]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className='add-subject'>
      <h2 className='add-subject__headline'>{content.headline}</h2>
      <Form>
        <Form.Group controlId='FormAddSubjectName'>
          <Form.Label className='add-subject__label'>{content.nameLabel}</Form.Label>
          <Form.Control type='string' onChange={onInputChange} />
        </Form.Group>
      </Form>
      <p className='add-subject__label'>{content.colorLabel}</p>
      <ColorPicker colorCodes={content.colorCodes} setSelectedColor={setColor} />
      <div className='add-subject__button-group'>
        <Button variant='outline-secondary' onClick={onCancel}>
          {content.cancel}
        </Button>
        <Button disabled={!isFormFilled} onClick={onSaveSubject}>
          {content.saveSubject}
        </Button>
      </div>
    </div>
  );
};

export default AddSubject;
