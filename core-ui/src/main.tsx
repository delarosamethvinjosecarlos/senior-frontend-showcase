// core-ui/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

async function enableMocking() {
  // En producción (cuando suba a Hostinger) esto será falso a menos que lo forcemos
  if (import.meta.env.PROD) {
    return;
  }

  const { worker } = await import('./infra/msw/browser');

  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});