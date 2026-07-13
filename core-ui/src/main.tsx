// core-ui/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App.tsx';
import { GlobalErrorFallback } from './ui/components/GlobalErrorFallback';

async function enableMocking() {
  const { worker } = await import('./infra/msw/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
});