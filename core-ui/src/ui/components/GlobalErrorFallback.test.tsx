// core-ui/src/ui/components/GlobalErrorFallback.test.tsx
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';

import { GlobalErrorFallback } from './GlobalErrorFallback';

const BombComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('¡Explosión de prueba en el componente!');
    }
    return <div>Componente Funcionando</div>;
};

describe('GlobalErrorFallback', () => {
    const originalError = console.error;

    beforeAll(() => {
        console.error = vi.fn();
    });

    afterAll(() => {
        console.error = originalError;
    });

    it('Debe renderizar la pantalla de fallback cuando un componente hijo falla', () => {
        render(
            <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                <BombComponent shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText('¡Oops! Algo ha salido mal en el simulador 🛠️')).toBeInTheDocument();

        expect(screen.getByText('¡Explosión de prueba en el componente!')).toBeInTheDocument();
    });

    it('Debe llamar a la función de reinicio cuando se hace clic en el botón', () => {
        const resetSpy = vi.fn();

        render(
            <GlobalErrorFallback
                error={new Error('Error falso')}
                resetErrorBoundary={resetSpy}
            />
        );

        const button = screen.getByRole('button', { name: /Reiniciar Aplicación/i });
        fireEvent.click(button);

        expect(resetSpy).toHaveBeenCalledTimes(1);
    });
});