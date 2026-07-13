// core-ui/src/App.tsx
import { useArchitectureSimulator } from './ui/hooks/useArchitectureSimulator';
import { useAiInterviewer } from './ui/hooks/useAiInterviewer';

import './App.css';

export default function App() {
  const { features, score, isLoading, toggleFeature } = useArchitectureSimulator();
  const { questions, isGenerating, error, generateQuestions } = useAiInterviewer();

  if (isLoading && features.length === 0) {
    return <div className="container">Cargando simulador...</div>;
  }

  return (
    <div className="container">

      <header className="header">
        <h1>Simulador Frontend Senior 🚀</h1>
        <div className="score-card">
          <div>
            <h2>Nivel de Seniority</h2>
            <p>Basado en decisiones arquitectónicas</p>
          </div>
          <span className="score-value">{score}%</span>
        </div>
      </header>

      <main className="features-list">
        {features.map((f) => (
          <div key={f.id} className={`feature-item ${f.isActive ? 'active' : ''}`}>
            <div className="feature-info">
              <h3>{f.name}</h3>
              <p>{f.description}</p>
            </div>
            <button
              onClick={() => toggleFeature(f.id, f.isActive)}
              className={`btn ${f.isActive ? 'btn-danger' : 'btn-primary'}`}
            >
              {f.isActive ? 'Desactivar' : 'Activar Habilidad'}
            </button>
          </div>
        ))}
      </main>

      <section className="ai-section">
        <div className="ai-header">
          <h2>🤖 Entrevistador IA</h2>
          <button onClick={generateQuestions} disabled={isGenerating} className="btn btn-ai">
            {isGenerating ? 'Analizando perfil...' : 'Generar Preguntas Técnicas'}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div>
          {questions.map((q) => (
            <div key={q.id} className="ai-question-card">
              <span className="ai-topic-badge">Tema: {q.topic}</span>
              <p className="ai-question-text">{q.question}</p>
              <div className="ai-validation-box">
                <strong>Validación (Spec-Driven):</strong> {q.expectedConcept}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}