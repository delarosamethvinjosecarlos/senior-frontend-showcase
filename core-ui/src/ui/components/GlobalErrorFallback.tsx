// core-ui/src/ui/components/GlobalErrorFallback.tsx
import type { FallbackProps } from 'react-error-boundary';

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return (
        <div className="error-boundary-container">
            <h2 className="error-boundary-title">
                ¡Oops! Algo ha salido mal en el simulador 🛠️
            </h2>

            <p className="error-boundary-desc">
                No te preocupes, como Senior Developer he preparado esta barrera de contención (Error Boundary) para evitar que la aplicación colapse por completo.
            </p>

            <pre className="error-boundary-pre">
                {errorMessage}
            </pre>

            <button
                onClick={resetErrorBoundary}
                className="btn btn-danger"
            >
                Reiniciar Aplicación
            </button>
        </div>
    );
}