// core-ui/src/infra/api/ApiArchitectureRepository.ts
import type { ArchitectureFeature } from '../../core/domain/ArchitectureFeature';
import type { ArchitectureRepository } from '../../core/domain/ArchitectureRepository';

export class ApiArchitectureRepository implements ArchitectureRepository {

    async getFeatures(): Promise<ArchitectureFeature[]> {
        const response = await fetch('/api/features');
        if (!response.ok) {
            throw new Error('Error en la conexión al obtener las características');
        }
        return response.json();
    }

    async toggleFeature(id: string, isActive: boolean): Promise<ArchitectureFeature> {
        const response = await fetch(`/api/features/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado de la característica');
        }
        return response.json();
    }
}