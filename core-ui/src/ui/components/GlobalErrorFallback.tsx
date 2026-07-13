// core-ui/src/ui/components/GlobalErrorFallback.tsx
import type { FallbackProps } from 'react-error-boundary';

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '600px',
            margin: '4rem auto',
            fontFamily: 'system-ui, sans-serif',
            backgroundColor: '#fef2f2',
            border: '2px solid #fca5a5',
            borderRadius: '8px',
            textAlign: 'center'
        }}>
            <h2 style={{ color: '#991b1b', marginTop: 0 }}>
                ¡Oops! Algo ha salido mal en el simulador 🛠️
            </h2>
            <p style={{ color: '#7f1d1d', marginBottom: '1.5rem' }}>
                No te preocupes, como Senior Developer he preparado esta barrera de contención (Error Boundary) para evitar que la aplicación colapse por completo.
            </p>

            <pre style={{
                backgroundColor: '#fee2e2',
                padding: '1rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                overflowX: 'auto',
                color: '#991b1b',
                textAlign: 'left'
            }}>
                {errorMessage}
            </pre>

            <button
                onClick={resetErrorBoundary}
                style={{
                    marginTop: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                }}
            >
                Reiniciar Aplicación
            </button>
        </div>
    );
}