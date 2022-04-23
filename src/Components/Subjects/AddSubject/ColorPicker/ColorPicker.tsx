import React, { useState } from 'react';

import './ColorPicker.scss';

type Props = {
  colorCodes: string[];
  setSelectedColor: (color: string) => void;
};

const ColorPicker = ({ colorCodes, setSelectedColor }: Props) => {
  const [selectedBox, setSelectedBox] = useState<(EventTarget & HTMLElement) | undefined>(
    undefined
  );

  const onBoxClick = (e: React.MouseEvent<HTMLElement>) => {
    const COLORBOX_CLASSNAMES = {
      selected: 'selected',
      notSelected: 'not-selected',
    };

    selectedBox?.classList.remove(COLORBOX_CLASSNAMES.selected);
    // give all boxes not-selected class
    const colorBoxes = document.querySelectorAll('.color-picker__color-box');
    colorBoxes.forEach((box) => {
      if (!box.classList.contains(COLORBOX_CLASSNAMES.notSelected))
        box.classList.add(COLORBOX_CLASSNAMES.notSelected);
    });

    const clickedBox = e.currentTarget;
    clickedBox.classList.remove(COLORBOX_CLASSNAMES.notSelected);
    clickedBox.classList.add(COLORBOX_CLASSNAMES.selected);

    setSelectedBox(clickedBox);
    const id = parseInt(clickedBox.id);
    setSelectedColor(colorCodes[id]);
  };
  const { firstRow, secondRow, thirdRow } = getColorBoxes(colorCodes, onBoxClick);

  return (
    <div className='color-picker'>
      <div className='color-picker__container'>{firstRow}</div>
      <div className='color-picker__container'>{secondRow}</div>
      <div className='color-picker__container'>{thirdRow}</div>
    </div>
  );
};

export default ColorPicker;

type Boxes = {
  firstRow: JSX.Element[];
  secondRow: JSX.Element[];
  thirdRow: JSX.Element[];
};

function getColorBoxes(
  colorCodes: string[],
  onBoxClick: (e: React.MouseEvent<HTMLElement>) => void
): Boxes {
  const firstRow = [];
  const secondRow = [];
  const thirdRow = [];

  for (let i = 0; i < colorCodes.length; i++) {
    if (i < 3) {
      firstRow.push(
        <div
          key={i}
          id={i.toString()}
          className='color-picker__color-box'
          style={{ backgroundColor: colorCodes[i] }}
          onClick={onBoxClick}
        />
      );
    } else if (i >= 3 && i < 6) {
      secondRow.push(
        <div
          key={i}
          id={i.toString()}
          className='color-picker__color-box'
          style={{ backgroundColor: colorCodes[i] }}
          onClick={onBoxClick}
        />
      );
    } else {
      thirdRow.push(
        <div
          key={i}
          id={i.toString()}
          className='color-picker__color-box'
          style={{ backgroundColor: colorCodes[i] }}
          onClick={onBoxClick}
        />
      );
    }
  }
  return { firstRow, secondRow, thirdRow };
}
