// src/core/domain/ArchitectureFeature.ts

export type SeniorityLevel = 'Junior' | 'Mid' | 'Senior';

export interface ArchitectureFeature {
    id: string;
    name: string;
    description: string;
    seniorityImpact: number;
    isActive: boolean;
}

// Muestra errores específicos del dominio
export class FeatureNotFoundError extends Error {
    constructor(id: string) {
        super(`La característica con ID ${id} no se encontró en el sistema.`);
        this.name = 'FeatureNotFoundError';
    }
}