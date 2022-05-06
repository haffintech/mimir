type ScheduledSession = {
  id: string;
  subjectId: string;
  topicId?: string; // in dev optional
  date: string;
  learningTechnique: number;
};

export type { ScheduledSession };
