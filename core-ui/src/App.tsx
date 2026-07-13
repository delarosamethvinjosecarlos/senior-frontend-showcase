// core-ui/src/App.tsx
import { useArchitectureSimulator } from './ui/hooks/useArchitectureSimulator';
import { useAiInterviewer } from './ui/hooks/useAiInterviewer';

export default function App() {
  const { features, score, isLoading, toggleFeature } = useArchitectureSimulator();
  const { questions, isGenerating, error, generateQuestions } = useAiInterviewer();

  if (isLoading && features.length === 0) {
    return <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'system-ui' }}>Cargando simulador...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>

      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#0f172a' }}>Simulador Frontend Senior 🚀</h1>
        <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#166534', fontSize: '1.2rem' }}>Nivel de Seniority</h2>
          </div>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a' }}>{score}%</span>
        </div>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        {features.map((feature) => (
          <div key={feature.id} style={{ padding: '1.5rem', border: `1px solid ${feature.isActive ? '#93c5fd' : '#e2e8f0'}`, borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: feature.isActive ? '#eff6ff' : '#ffffff' }}>
            <div style={{ maxWidth: '75%' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{feature.name}</h3>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>{feature.description}</p>
            </div>
            <button onClick={() => toggleFeature(feature.id, feature.isActive)} style={{ padding: '0.75rem 1.25rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: feature.isActive ? '#ef4444' : '#3b82f6', color: 'white', border: 'none' }}>
              {feature.isActive ? 'Desactivar' : 'Activar Habilidad'}
            </button>
          </div>
        ))}
      </main>

      <section style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#0f172a' }}>🤖 Entrevistador IA</h2>
          <button
            onClick={generateQuestions}
            disabled={isGenerating}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: isGenerating ? 'wait' : 'pointer', fontWeight: 'bold', backgroundColor: '#6366f1', color: 'white', border: 'none', opacity: isGenerating ? 0.7 : 1 }}
          >
            {isGenerating ? 'IA Analizando perfil...' : 'Generar Preguntas Técnicas'}
          </button>
        </div>

        {error && <div style={{ padding: '1rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '6px', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {questions.map((q) => (
            <div key={q.id} style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderLeft: '4px solid #6366f1', borderRadius: '0 8px 8px 0' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#6366f1', fontWeight: 'bold', letterSpacing: '1px' }}>Tema: {q.topic}</span>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1e293b', marginTop: '0.5rem' }}>{q.question}</p>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e0e7ff', borderRadius: '6px', fontSize: '0.9rem', color: '#3730a3' }}>
                <strong>Validación (Spec-Driven):</strong> {q.expectedConcept}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}