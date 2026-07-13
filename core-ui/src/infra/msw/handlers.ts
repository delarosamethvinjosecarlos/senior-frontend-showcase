// core-ui/src/infra/msw/handlers.ts
import { http, HttpResponse, delay } from 'msw';

import type { ArchitectureFeature } from '../../core/domain/ArchitectureFeature';
import type { AiQuestion } from '../../core/domain/AiQuestion';

const dbFeatures: ArchitectureFeature[] = [
    { id: 'clean-arch', name: 'Clean Architecture / Hexagonal', description: 'Separación estricta de responsabilidades mediante capas.', seniorityImpact: 35, isActive: false },
    { id: 'msw-mocking', name: 'Network-level Mocking (MSW)', description: 'Interceptación de peticiones de red para simular entornos.', seniorityImpact: 20, isActive: false },
    { id: 'ai-engineering', name: 'AI Engineering & Prompting', description: 'Validación de código generado por LLMs y optimización de tokens.', seniorityImpact: 45, isActive: false }
];

export const handlers = [
    http.get('/api/features', () => HttpResponse.json(dbFeatures)),

    http.patch('/api/features/:id', async ({ request, params }) => {
        const { id } = params;

        const body = await request.json() as { isActive: boolean };

        const featureIndex = dbFeatures.findIndex((f) => f.id === id);

        if (featureIndex === -1) return new HttpResponse('Not found', { status: 404 });

        dbFeatures[featureIndex].isActive = body.isActive;

        return HttpResponse.json(dbFeatures[featureIndex]);
    }),

    http.post('/api/ai/generate', async ({ request }) => {
        const body = await request.json() as { topics: string[] };

        await delay(1500);

        const generatedQuestions: AiQuestion[] = body.topics.map((topic, index) => ({
            id: `ai-q-${index}`,
            topic: topic,
            question: `Como experto en ${topic}, ¿qué estrategias utilizarías para evitar el sobreacoplamiento si el proyecto escala repentinamente a múltiples equipos?`,
            expectedConcept: `El candidato debería mencionar patrones de diseño, inyección de dependencias y modularización específica para ${topic}.`,
            difficulty: 'Senior'
        }));

        return HttpResponse.json(generatedQuestions);
    }),
];