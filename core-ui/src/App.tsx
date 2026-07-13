// core-ui/src/App.tsx
import { useArchitectureSimulator } from './ui/hooks/useArchitectureSimulator';

export default function App() {
  const { features, score, isLoading, toggleFeature } = useArchitectureSimulator();

  if (isLoading && features.length === 0) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'system-ui' }}>
        Cargando simulador...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>

      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#0f172a' }}>Simulador Frontend Senior 🚀</h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Demostración técnica interactiva de Clean Architecture y MSW Mocking.
        </p>

        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: 0, color: '#166534', fontSize: '1.2rem' }}>Nivel de Seniority Calculado</h2>
            <p style={{ margin: 0, color: '#15803d', fontSize: '0.9rem' }}>Basado en las decisiones arquitectónicas</p>
          </div>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a' }}>
            {score}%
          </span>
        </div>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            style={{
              padding: '1.5rem',
              border: `1px solid ${feature.isActive ? '#93c5fd' : '#e2e8f0'}`,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: feature.isActive ? '#eff6ff' : '#ffffff',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ maxWidth: '75%' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{feature.name}</h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {feature.description}
              </p>
              <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#2563eb' }}>
                Impacto: +{feature.seniorityImpact}%
              </span>
            </div>

            <button
              onClick={() => toggleFeature(feature.id, feature.isActive)}
              style={{
                padding: '0.75rem 1.25rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: feature.isActive ? '#ef4444' : '#3b82f6',
                color: 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s'
              }}
            >
              {feature.isActive ? 'Desactivar' : 'Activar Habilidad'}
            </button>
          </div>
        ))}
      </main>

    </div>
  );
}