// __tests__/Header.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../app/MainChat/Header';

// Provide dummy props as required by Header
const dummyProps = {
  selectedModel: 'llama3-8b-8192',
  setSelectedModel: jest.fn(),
  conversationalMemory: false,
  setConversationalMemory: jest.fn(),
};

describe('Header Component', () => {
  it('renders the "AI Memory" text', () => {
    render(<Header {...dummyProps} />);
    const aiMemoryText = screen.getByText(/AI Memory/i);
    expect(aiMemoryText).toBeInTheDocument();
  });
});