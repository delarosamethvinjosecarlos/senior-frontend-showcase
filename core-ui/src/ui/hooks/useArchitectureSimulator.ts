// core-ui/src/ui/hooks/useArchitectureSimulator.ts
import { useState, useEffect, useMemo } from 'react';

import { ApiArchitectureRepository } from '../../infra/api/ApiArchitectureRepository';
import { CalculateSeniorityScoreUseCase } from '../../core/use-cases/CalculateSeniorityScoreUseCase';
import type { ArchitectureFeature } from '../../core/domain/ArchitectureFeature';

export function useArchitectureSimulator() {
    const [features, setFeatures] = useState<ArchitectureFeature[]>([]);
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const repository = useMemo(() => new ApiArchitectureRepository(), []);
    const calculateScoreUseCase = useMemo(() => new CalculateSeniorityScoreUseCase(repository), [repository]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // 1. Pedimos las features al repositorio (que por debajo usa fetch y lo intercepta MSW)
            const fetchedFeatures = await repository.getFeatures();
            setFeatures(fetchedFeatures);

            // 2. Ejecutamos la regla de negocio para calcular el porcentaje
            const currentScore = await calculateScoreUseCase.execute();
            setScore(currentScore);
        } catch (error) {
            console.error("Error cargando los datos del simulador:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Cargamos los datos iniciales al montar el hook
    useEffect(() => {
        loadData();
    }, []);

    const toggleFeature = async (id: string, currentState: boolean) => {
        try {
            // Enviamos la petición de cambio de estado a la API
            await repository.toggleFeature(id, !currentState);
            // Recargamos los datos para tener la fuente de la verdad sincronizada
            await loadData();
        } catch (error) {
            console.error("Error al actualizar la característica:", error);
        }
    };

    return { features, score, isLoading, toggleFeature };
}