// core-ui/src/core/use-cases/CalculateSeniorityScoreUseCase.ts

import type { ArchitectureRepository } from '../domain/ArchitectureRepository';

export class CalculateSeniorityScoreUseCase {
    private repository: ArchitectureRepository;

    constructor(repository: ArchitectureRepository) {
        this.repository = repository;
    }

    async execute(): Promise<number> {
        // 1. Obtenemos las características a través del puerto (interfaz)
        const features = await this.repository.getFeatures();

        // 2. Calculamos el score sumando el impacto de las que están activas
        const totalScore = features.reduce((acc, feature) => {
            return feature.isActive ? acc + feature.seniorityImpact : acc;
        }, 0);

        // 3. El score nunca puede superar el 100%
        return Math.min(totalScore, 100);
    }
}