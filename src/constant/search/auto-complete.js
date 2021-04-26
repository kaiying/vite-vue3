import { values } from 'ramda';

export const autoCompleteCount = {
  mobile: 3,
  history: 5,
  recommends: 15,
};

export const arrowKeyEnum = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
};

export const specialKeyEnum = {
  enter: 'Enter',
  esc: 'Escape',
};

export const historyCount = 5;

export const specialKeys = [...values(arrowKeyEnum), specialKeyEnum.enter];

export const hoverDefaultIndex = -1;
