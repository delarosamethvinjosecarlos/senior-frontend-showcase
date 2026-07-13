// core-ui/src/ui/hooks/useAiInterviewer.ts
import { useState, useMemo } from 'react';

import { ApiAiRepository } from '../../infra/api/ApiAiRepository';
import { ApiArchitectureRepository } from '../../infra/api/ApiArchitectureRepository';
import { GenerateInterviewQuestionsUseCase } from '../../core/use-cases/GenerateInterviewQuestionsUseCase';
import type { AiQuestion } from '../../core/domain/AiQuestion';

export function useAiInterviewer() {
    const [questions, setQuestions] = useState<AiQuestion[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const useCase = useMemo(() => {
        return new GenerateInterviewQuestionsUseCase(
            new ApiArchitectureRepository(),
            new ApiAiRepository()
        );
    }, []);

    const generateQuestions = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const result = await useCase.execute();
            setQuestions(result);
        } catch (err: any) {
            setError(err.message || "Error desconocido al generar preguntas");
        } finally {
            setIsGenerating(false);
        }
    };

    return { questions, isGenerating, error, generateQuestions };
}