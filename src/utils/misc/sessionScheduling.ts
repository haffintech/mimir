import { ScheduledSession } from '../../Types/Session';
import { Topic } from '../../Types/Topic';
import { getUniqueId } from './idGenerator';

const getNormalizedDate = () => {
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const todayInMilliseconds = today.getTime();
  const tomorrow = new Date(todayInMilliseconds + dayInMilliseconds);
  return tomorrow.toISOString();
};

/**
 *
 * @param topic Topic this session is scheduled for
 * @returns ScheduledSession
 */
export const getPrestudySession = (topic: Topic) => {
  const prestudySession: ScheduledSession = {
    id: getUniqueId(),
    subjectId: topic.subjectId,
    topicId: topic.id,
    date: getNormalizedDate(),
    learningTechnique: 1,
  };
  return prestudySession;
};

export const getInClassSession = () => {};
