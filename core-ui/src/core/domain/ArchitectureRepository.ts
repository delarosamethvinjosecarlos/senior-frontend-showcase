// core-ui/src/core/domain/ArchitectureRepository.ts
import type { ArchitectureFeature } from './ArchitectureFeature';

export interface ArchitectureRepository {
    getFeatures(): Promise<ArchitectureFeature[]>;
    toggleFeature(id: string, isActive: boolean): Promise<ArchitectureFeature>;
}