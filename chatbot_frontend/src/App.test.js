import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders initial assistant message', () => {
  render(<App />);
  expect(screen.getByText(/Ask a question and the assistant will reply/i)).toBeInTheDocument();
});

test('allows typing into input', () => {
  render(<App />);
  const input = screen.getByLabelText(/Question input/i);
  fireEvent.change(input, { target: { value: 'Hello?' } });
  expect(input).toHaveValue('Hello?');
});
