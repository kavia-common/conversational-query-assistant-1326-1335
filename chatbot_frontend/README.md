# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Quick start

1) Install dependencies:
   cd chatbot_frontend
   npm install

2) Start the backend (in a separate terminal) so API calls succeed:
   - See backend quickstart under ../conversational-query-assistant-1326-1336/chatbot_backend
   - By default, the CRA dev server proxies API calls to http://localhost:8000

3) Start the frontend:
   npm start
   Open http://localhost:3000

If the backend runs on a different host/port/base path, create a .env file:
   REACT_APP_BACKEND_API_URL=http://localhost:8000/api
See .env.example for reference.

Note: Do NOT place your OpenAI key in the frontend. The backend uses OPENAI_API_KEY.

## Backend API URL configuration

The frontend calls the backend at a configurable base URL.

- Build-time env: set REACT_APP_BACKEND_API_URL in a `.env` file (see `.env.example`).
- Runtime override: you can also inject `window.BACKEND_API_URL` in `public/index.html` before the bundle to override the build-time value.
- Fallback: if neither is provided, the app defaults to `/api` (works with CRA proxy for local development).

Examples:
- Local/dev using a backend running on port 8000 and base path `/api`:
  REACT_APP_BACKEND_API_URL=http://localhost:8000/api

The chat endpoint used is: `${BACKEND_API_URL}/chat/`.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
