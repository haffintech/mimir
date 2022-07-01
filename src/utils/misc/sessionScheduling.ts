import { SavedSession, ScheduledSession } from '../../Types/Session';
import { Topic } from '../../Types/Topic';
import { getUniqueId } from './idGenerator';

const getNormalizedDate = () => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today;
};

/**
 *
 * @param topic Topic this session is scheduled for
 * @param topicSessions all previous sessions in this topic
 * @returns ScheduledSession
 */
export const getNextSession = (topic: Topic, topicSessions: SavedSession[]) => {
  const learningTechnique = getRandomTechniqueID(topicSessions);
  const date = getNextStudyDate(topic.leitnerBox, topicSessions);
  const nextSession: ScheduledSession = {
    id: getUniqueId(),
    subjectId: topic.subjectId,
    topicId: topic.id,
    date,
    learningTechnique,
  };
  return nextSession;
};

const getRandomTechniqueID = (sessions: SavedSession[]) => {
  let techniqueID = 0;
  let sessionsWithTechnique;
  do {
    const randomTechniqueID = Math.round(Math.random() * 7) + 1;
    sessionsWithTechnique = sessions.filter(
      (session) => session.learningTechnique === randomTechniqueID
    );
    techniqueID = randomTechniqueID;
  } while (sessionsWithTechnique.length > 0);

  return techniqueID;
};

const getNextStudyDate = (leitnerBox: number, topicSessions: SavedSession[]) => {
  const sortedSessions = topicSessions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA < dateB) return 1;
    else if (dateA === dateB) return 0;
    else return -1;
  });
  const today = getNormalizedDate();
  const lastSession = sortedSessions[0];
  if (!lastSession) {
    return addDaysToDate(today, 1).toISOString();
  }
  const lastRevision = new Date(lastSession.date);
  console.log(lastRevision);

  const days = Math.round(Math.pow(leitnerBox, 2.25) + 3);
  const newDate = addDaysToDate(lastRevision, days);
  return newDate.toISOString();
};

const addDaysToDate = (date: Date, days: number) => {
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  const dateInMilliseconds = date.getTime();
  return new Date(dateInMilliseconds + days * dayInMilliseconds);
};

export const getNewTopicLeitnerBox = (topic: Topic, lastSession: SavedSession) => {
  const currentBox = topic.leitnerBox;
  const retention = lastSession.retention;
  if (retention === 1) return 0;
  if (retention === 2) return Math.floor(currentBox / 2);
  if (retention === 3 && currentBox < 3) return currentBox + 1;
  if (retention === 3 && currentBox === 3) return currentBox;
  if (retention === 3 && currentBox > 3) return currentBox - 1;

  return currentBox + 1;
};
