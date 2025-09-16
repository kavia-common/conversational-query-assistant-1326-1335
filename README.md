# conversational-query-assistant-1326-1335

Frontend environment
- The React frontend supports configuring the backend base URL via `REACT_APP_BACKEND_API_URL` in a `.env` file under `chatbot_frontend/`.
- See `chatbot_frontend/.env.example` for an example (e.g., http://localhost:8000/api).
- If not set, the app falls back to `/api` (works with CRA proxy).

Troubleshooting startup
1) Frontend:
   - Ensure dependencies are installed: 
     cd chatbot_frontend && npm install
   - Start dev server:
     npm start
   - If API calls fail (502/404), ensure backend is running at http://localhost:8000 or set REACT_APP_BACKEND_API_URL.

2) Backend:
   - Install Python deps:
     cd ../conversational-query-assistant-1326-1336/chatbot_backend
     pip install -r requirements.txt
   - Start server:
     python manage.py runserver 0.0.0.0:8000
   - Health check:
     curl http://localhost:8000/api/health/
   - For chat to work, set OPENAI_API_KEY in environment (see .env.example). Backend will still start without it.