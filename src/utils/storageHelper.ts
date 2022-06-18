import { RootState } from '../reduxSetup/store';

const STORAGE_KEY = 'MIMIR_APP_STATE';

export const saveAppState = (state: RootState) => {
  const stringifiedState = JSON.stringify(state);
  localStorage.setItem(STORAGE_KEY, stringifiedState);
};

export const getSavedAppState = () => {
  const storageString = localStorage.getItem(STORAGE_KEY);
  if (storageString) {
    const state = JSON.parse(storageString);
    return state;
  }

  return null;
};
