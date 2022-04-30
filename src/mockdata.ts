import { Subject } from './Types/Subject';
import { scheduledSession } from './Types/Session';

const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'math',
    colorCode: '#37c81b',
  },
  {
    id: '2',
    name: 'english',
    colorCode: '#4d4dff',
  },
  {
    id: '3',
    name: 'info',
    colorCode: '#ff531a',
  },
  {
    id: '4',
    name: 'physics',
    colorCode: '#ae0624',
  },
  {
    id: '5',
    name: 'math',
    colorCode: '#24700a',
  },
  {
    id: '6',
    name: 'english',
    colorCode: '#00708a',
  },
  {
    id: '7',
    name: 'info',
    colorCode: '#f7dc00',
  },
  {
    id: '8',
    name: 'physics',
    colorCode: '#1b222c',
  },
  {
    id: '9',
    name: 'info',
    colorCode: '#8e37e0',
  },
  {
    id: '10',
    name: 'physics',
    colorCode: '#ae0624',
  },
];

const mockScheduledSessions: scheduledSession[] = [
  {
    id: '1',
    subjectId: '1',
    date: '2022-04-23T12:00:00.000Z',
    learningTechnique: 1,
  },
  {
    id: '2',
    subjectId: '1',
    date: '2022-05-01T12:00:00.000Z',
    learningTechnique: 3,
  },
  {
    id: '3',
    subjectId: '1',
    date: '2022-05-23T12:00:00.000Z',
    learningTechnique: 2,
  },
  {
    id: '4',
    subjectId: '1',
    date: '2022-04-13T12:00:00.000Z',
    learningTechnique: 7,
  },
  {
    id: '5',
    subjectId: '1',
    date: '2022-03-23T12:00:00.000Z',
    learningTechnique: 5,
  },
  {
    id: '6',
    subjectId: '1',
    date: '2022-05-13T12:00:00.000Z',
    learningTechnique: 3,
  },
];

export { mockSubjects, mockScheduledSessions };
