# 🚀 Senior Frontend Showcase | Architecture & AI Simulator

![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-purple?style=for-the-badge&logo=vite)
![MSW](https://img.shields.io/badge/MSW-Mocking-orange?style=for-the-badge)
![Vitest](https://img.shields.io/badge/Vitest-Testing-green?style=for-the-badge)

Este repositorio no es solo una aplicación, es un **Showcase Técnico** diseñado para demostrar prácticas de ingeniería de software de nivel Senior.

La aplicación es un simulador interactivo que evalúa el impacto de decisiones arquitectónicas y genera preguntas de entrevista en tiempo real mediante un flujo seguro de Inteligencia Artificial.

🌐 **[Ver Demo en Vivo](https://senior-frontend-showcase.es)** *(Asegúrate de cambiar esto por tu dominio real)*

---

## 🏗️ Clean Architecture

El proyecto se aleja del tradicional "todo acoplado en React" y aplica una estricta **Arquitectura Limpia** para separar la lógica de negocio de la interfaz visual.

La base de código está dividida en 4 capas:

* **`core/domain` (Dominio):** Modelos de datos estrictos (`types` e `interfaces`) y contratos (`Repositories`). Totalmente agnóstico de librerías externas.
* **`core/use-cases` (Casos de Uso):** Funciones puras que contienen la lógica de negocio (ej. `CalculateSeniorityScoreUseCase`). Son 100% testeables sin necesidad de renderizar componentes.
* **`infra/` (Infraestructura):** Implementaciones reales de los repositorios y llamadas de red.
* **`ui/` (Presentación):** Componentes React, Custom Hooks (Controladores) y CSS moderno. React actúa únicamente como una librería de pintado, sin conocer las reglas de negocio.

---

## ✨ Características Técnicas Destacadas

### 1. Spec-Driven Development con MSW (Mock Service Worker)
La aplicación realiza llamadas HTTP reales mediante `fetch`, pero son interceptadas a nivel de Service Worker en el navegador. Esto permite:
* Desarrollar el 100% del frontend sin depender de que el backend esté terminado.
* Desplegar el portfolio en modo "Demo" sin necesidad de mantener una base de datos o un servidor en producción.

### 2. Integración Segura de IA (AI Engineering)
La generación de preguntas de entrevista NO ataca a la API de OpenAI/Anthropic directamente desde el frontend (evitando exponer API Keys). El frontend delega la petición a su propia API (`/api/ai/generate`), preparando la app para un entorno de microservicios.

### 3. Resiliencia con Error Boundaries
Implementación de barreras de contención (`react-error-boundary`). Si una petición a la IA falla o un dato llega corrupto, la aplicación no colapsa en un "White Screen of Death", sino que captura el error, muestra una interfaz de fallback amigable y permite reiniciar el flujo.

### 4. Zero "Any" Policy (TypeScript Estricto)
Configuración moderna y estricta de TypeScript (`verbatimModuleSyntax`, `erasableSyntaxOnly`). Se evita el uso de `any`, aplicando *Type Narrowing* y tipando los errores atrapados en bloques try/catch mediante `unknown`.

### 5. Mobile-First & CSS Moderno
Maquetación fluida y *responsive* usando CSS puro con Variables Globales, Flexbox y Media Queries, logrando un diseño pixel-perfect sin librerías pesadas como Bootstrap o Tailwind.

---

## 🛠️ Instalación y Uso Local

Para levantar este proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/senior-frontend-showcase.git](https://github.com/TU_USUARIO/senior-frontend-showcase.git)