// core-ui/src/core/domain/AiQuestion.ts

export type DifficultyLevel = 'Mid' | 'Senior' | 'Lead';

export interface AiQuestion {
    id: string;
    topic: string;
    question: string;
    expectedConcept: string;
    difficulty: DifficultyLevel;
}