type scheduledSession = {
  id: string;
  userId: string;
  subjectId: string;
  topicId?: string; // in dev optional
  date: string;
  learningTechnique: number;
};

export type { scheduledSession };
