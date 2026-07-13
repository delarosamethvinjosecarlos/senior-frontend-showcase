// core-ui/src/infra/msw/handlers.ts
import { http, HttpResponse } from 'msw';

import type { ArchitectureFeature } from '../../core/domain/ArchitectureFeature';

const dbFeatures: ArchitectureFeature[] = [
    {
        id: 'clean-arch',
        name: 'Clean Architecture / Hexagonal',
        description: 'Separación estricta de responsabilidades mediante capas e inyección de dependencias.',
        seniorityImpact: 35,
        isActive: false,
    },
    {
        id: 'msw-mocking',
        name: 'Network-level Mocking (MSW)',
        description: 'Interceptación de peticiones de red para simular entornos y testear sin dependencias.',
        seniorityImpact: 20,
        isActive: false,
    },
    {
        id: 'ai-engineering',
        name: 'AI Engineering & Prompting',
        description: 'Validación de código generado por LLMs y optimización del gasto de tokens.',
        seniorityImpact: 45,
        isActive: false,
    }
];

export const handlers = [
    http.get('/api/features', () => {
        return HttpResponse.json(dbFeatures);
    }),

    http.patch('/api/features/:id', async ({ request, params }) => {
        const { id } = params;
        const body = await request.json() as { isActive: boolean };

        const featureIndex = dbFeatures.findIndex((f) => f.id === id);

        if (featureIndex === -1) {
            return new HttpResponse('Not found', { status: 404 });
        }

        dbFeatures[featureIndex].isActive = body.isActive;

        return HttpResponse.json(dbFeatures[featureIndex]);
    }),
];