import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import SubjectsPanel from './SubjectPanel/SubjectsPanel';
import AddSubject from './AddSubject/AddSubject';

import { Subject } from '../../Types/Subject';
import useViewportResize from '../../utils/hooks/useViewportResize';
import { breakpoints } from '../../utils/misc/breakpoints';
import './Subjects.scss';
import { VoidExpression } from 'typescript';

type Props = {
  content: {
    headline: string;
    addSubject: string;
    addSubjects: {
      nameLabel: string;
      colorLabel: string;
      cancel: string;
      saveSubject: string;
      colorCodes: string[];
    };
  };
  subjects: Subject[];
  onSubjectClick: (subject: Subject) => void;
};

const Subjects = ({ content, subjects, onSubjectClick }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const addSubjectButtonRef = useRef(null);

  const { width } = useViewportResize();
  const isMobile = width < breakpoints.md;

  const onAddSubjectCancel = () => {
    setIsModalOpen(false);
  };

  const onSaveSubject = () => {
    setIsModalOpen(false);
  };

  const onAddSubject = () => {
    setIsModalOpen(!isModalOpen);
  };
  if (isMobile) {
    return (
      <div className='subjects'>
        <div className='subjects__header-container'>
          <h2 className='subjects__headline'>{content.headline}</h2>
          <Button
            variant='outline-secondary'
            size='sm'
            onClick={onAddSubject}
            ref={addSubjectButtonRef}
          >
            {content.addSubject}
          </Button>
        </div>
        <SubjectsPanel subjects={subjects} onSubjectClick={onSubjectClick} />
        <Modal centered show={isModalOpen} onHide={onAddSubjectCancel}>
          <AddSubject
            content={{ ...content.addSubjects, headline: content.addSubject }}
            onCancel={onAddSubjectCancel}
            onSaveSubject={onSaveSubject}
          />
        </Modal>
      </div>
    );
  } else {
    return (
      <div className='subjects'>
        <div className='subjects__header-container'>
          <h2 className='subjects__headline'>{content.headline}</h2>
          <OverlayTrigger
            trigger='click'
            placement='bottom'
            show={isModalOpen}
            overlay={
              <Popover className='subjects__popover'>
                <AddSubject
                  content={{ ...content.addSubjects, headline: content.addSubject }}
                  onCancel={onAddSubjectCancel}
                  onSaveSubject={onSaveSubject}
                />
              </Popover>
            }
          >
            <Button variant='outline-secondary' size='sm' onClick={onAddSubject}>
              {content.addSubject}
            </Button>
          </OverlayTrigger>
        </div>
        <SubjectsPanel subjects={subjects} onSubjectClick={onSubjectClick} />
      </div>
    );
  }
};

export default Subjects;
