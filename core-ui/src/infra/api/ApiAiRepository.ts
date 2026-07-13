// core-ui/src/infra/api/ApiAiRepository.ts
import type { AiQuestion } from '../../core/domain/AiQuestion';
import type { AiRepository } from '../../core/domain/AiRepository';

export class ApiAiRepository implements AiRepository {
    async generateQuestionsFromTopics(topics: string[]): Promise<AiQuestion[]> {
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topics }),
        });

        if (!response.ok) {
            throw new Error('Error al conectar con el motor de IA');
        }

        return response.json();
    }
}