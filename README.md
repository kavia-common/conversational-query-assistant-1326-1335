# conversational-query-assistant-1326-1335

Frontend environment
- The React frontend supports configuring the backend base URL via `REACT_APP_BACKEND_API_URL` in a `.env` file under `chatbot_frontend/`.
- See `chatbot_frontend/.env.example` for an example (e.g., http://localhost:3001/api).
- If not set, the app falls back to `/api` (works with CRA proxy).