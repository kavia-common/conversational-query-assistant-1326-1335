import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

/**
 * Chat message structure
 * role: 'user' | 'assistant'
 * content: string
 */
const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 12
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 12px',
          borderRadius: 12,
          background: isUser ? 'var(--text-secondary)' : 'var(--bg-secondary)',
          color: isUser ? '#0b1b24' : 'var(--text-primary)',
          border: isUser ? 'none' : '1px solid var(--border-color)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
        aria-label={isUser ? 'User message' : 'Assistant message'}
      >
        {!isUser && <strong style={{ display: 'block', marginBottom: 4 }}>🤖 Assistant</strong>}
        {isUser && <strong style={{ display: 'block', marginBottom: 4, textAlign: 'right' }}>You</strong>}
        <span>{content}</span>
      </div>
    </div>
  );
};

// PUBLIC_INTERFACE
function App() {
  // Theme handling
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Chat state
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything and I will try to help.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const listEndRef = useRef(null);

  // Determine API base URL in a configurable way.
  // Priority:
  // 1) window.BACKEND_API_URL (can be injected at runtime in index.html)
  // 2) process.env.REACT_APP_BACKEND_API_URL (set at build time via .env)
  // 3) fallback to '/api' (works with CRA proxy during local dev)
  const apiBase = useMemo(() => {
    const runtime = typeof window !== 'undefined' ? window.BACKEND_API_URL : undefined;
    const buildTime = process.env.REACT_APP_BACKEND_API_URL;
    return (runtime || buildTime || '/api').replace(/\/+$/, ''); // trim trailing slashes
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    const question = input.trim();
    if (!question) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);

    try {
      // Call backend
      const res = await fetch(`${apiBase}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Backend expects { question, model?, system_prompt? }
        body: JSON.stringify({ question })
      });

      if (!res.ok) {
        let detail = '';
        try {
          const data = await res.json();
          detail = data?.detail || data?.error || '';
        } catch {
          // ignore json parse errors
        }
        throw new Error(`Request failed (${res.status}). ${detail}`);
      }

      const data = await res.json();
      const answer = data?.answer ?? 'Sorry, I could not find an answer.';

      // Append assistant reply
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      // Add a visible assistant error message to the chat
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '⚠️ There was an error fetching the answer. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: '100vh', padding: '20px 16px' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div
          className="container"
          style={{
            width: '100%',
            maxWidth: 860,
            margin: '64px auto 16px',
            padding: 16,
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            background: 'var(--bg-primary)'
          }}
        >
          <h1 className="title" style={{ margin: '0 0 8px' }}>
            Conversational Q&A
          </h1>
          <p className="description" style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>
            Ask a question and the assistant will reply.
          </p>

          <div
            role="log"
            aria-live="polite"
            aria-busy={loading ? 'true' : 'false'}
            style={{
              height: '50vh',
              minHeight: 280,
              maxHeight: '60vh',
              overflowY: 'auto',
              padding: '8px 4px',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              background: 'var(--bg-primary)',
              marginBottom: 12
            }}
          >
            {messages.map((m, idx) => (
              <MessageBubble key={idx} role={m.role} content={m.content} />
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--text-secondary)' }}>
                <span className="loader" aria-hidden="true">⏳</span>
                <span>Thinking…</span>
              </div>
            )}
            <div ref={listEndRef} />
          </div>

          {errorMsg && (
            <div
              role="alert"
              style={{
                color: '#b00020',
                background: 'rgba(176,0,32,0.08)',
                border: '1px solid rgba(176,0,32,0.2)',
                padding: '8px 10px',
                borderRadius: 8,
                marginBottom: 8
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              aria-label="Question input"
              style={{
                flex: 1,
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)'
              }}
              disabled={loading}
            />
            <button
              type="submit"
              className="btn"
              disabled={loading || input.trim().length === 0}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--button-bg)',
                color: 'var(--button-text)',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600
              }}
              aria-label="Send question"
            >
              {loading ? 'Sending…' : 'Send'}
            </button>
          </form>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 8 }}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
