// core-ui/src/core/use-cases/GenerateInterviewQuestionsUseCase.ts
import type { ArchitectureRepository } from '../domain/ArchitectureRepository';
import type { AiRepository } from '../domain/AiRepository';
import type { AiQuestion } from '../domain/AiQuestion';

export class GenerateInterviewQuestionsUseCase {
    private architectureRepo: ArchitectureRepository;
    private aiRepo: AiRepository;

    constructor(
        architectureRepo: ArchitectureRepository,
        aiRepo: AiRepository
    ) {
        this.architectureRepo = architectureRepo;
        this.aiRepo = aiRepo;
    }

    async execute(): Promise<AiQuestion[]> {
        const features = await this.architectureRepo.getFeatures();

        const activeTopics = features
            .filter((feature) => feature.isActive)
            .map((feature) => feature.name);

        if (activeTopics.length === 0) {
            throw new Error("Debes activar al menos una tecnología para generar preguntas.");
        }

        return await this.aiRepo.generateQuestionsFromTopics(activeTopics);
    }
}