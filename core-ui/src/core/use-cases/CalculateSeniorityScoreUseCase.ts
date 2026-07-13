// core-ui/src/core/use-cases/CalculateSeniorityScoreUseCase.ts
import type { ArchitectureFeature } from '../domain/ArchitectureFeature';

export class CalculateSeniorityScoreUseCase {
    execute(features: ArchitectureFeature[]): number {
        const totalScore = features.reduce((acc, feature) => {
            return feature.isActive ? acc + feature.seniorityImpact : acc;
        }, 0);

        return Math.min(totalScore, 100);
    }
}