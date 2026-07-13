// core-ui/src/core/domain/AiRepository.ts
import type { AiQuestion } from './AiQuestion';

export interface AiRepository {
    generateQuestionsFromTopics(topics: string[]): Promise<AiQuestion[]>;
}