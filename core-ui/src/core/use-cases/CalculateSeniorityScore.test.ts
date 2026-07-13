// core-ui/src/core/use-cases/CalculateSeniorityScoreUseCase.test.ts
import { describe, it, expect } from 'vitest';

import { CalculateSeniorityScoreUseCase } from './CalculateSeniorityScoreUseCase';
import type { ArchitectureFeature } from '../domain/ArchitectureFeature';

describe('CalculateSeniorityScoreUseCase', () => {
    const useCase = new CalculateSeniorityScoreUseCase();

    it('1. Debe sumar exactamente el impacto de las características activas', () => {
        const mockFeatures: ArchitectureFeature[] = [
            { id: 'clean', name: 'Clean Arch', description: '', seniorityImpact: 35, isActive: true },
            { id: 'msw', name: 'MSW Mocking', description: '', seniorityImpact: 20, isActive: false },
            { id: 'ai', name: 'AI Engineering', description: '', seniorityImpact: 45, isActive: true }
        ];

        const result = useCase.execute(mockFeatures);

        expect(result).toBe(80);
    });

    it('2. Nunca debe devolver un porcentaje superior a 100, aunque la suma sea mayor', () => {
        const mockFeatures: ArchitectureFeature[] = [
            { id: 'feat1', name: 'Super Feature 1', description: '', seniorityImpact: 60, isActive: true },
            { id: 'feat2', name: 'Super Feature 2', description: '', seniorityImpact: 50, isActive: true }
        ];

        const result = useCase.execute(mockFeatures);

        expect(result).toBe(100);
    });
});