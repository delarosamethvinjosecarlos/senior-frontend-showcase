// core-ui/src/core/use-cases/CalculateSeniorityScoreUseCase.ts

import type { ArchitectureRepository } from '../domain/ArchitectureRepository';

export class CalculateSeniorityScoreUseCase {
    private repository: ArchitectureRepository;

    constructor(repository: ArchitectureRepository) {
        this.repository = repository;
    }

    async execute(): Promise<number> {
        const features = await this.repository.getFeatures();

        const totalScore = features.reduce((acc, feature) => {
            return feature.isActive ? acc + feature.seniorityImpact : acc;
        }, 0);

        return Math.min(totalScore, 100);
    }
}