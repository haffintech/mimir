type ScheduledSession = {
  id: string;
  subjectId: string;
  topicId: string;
  date: string;
  learningTechnique: number;
};
type SavedSession = {
  id: string;
  subjectId: string;
  topicId: string;
  date: string;
  feedback: string;
  learningTechnique: number;
  retention: number;
};

export type { ScheduledSession, SavedSession };
