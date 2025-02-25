// __tests__/PromptInput.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PromptInput from '../app/MainChat/PromptInput';

// Mock next/navigation to avoid errors with useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('PromptInput Component', () => {
  it('updates the input value when typing', () => {
    const setMessages = jest.fn();
    const setLoading = jest.fn();
    
    render(
      <PromptInput
        messages={[]}
        setMessages={setMessages}
        conversationalMemory={false}
        selectedModel="llama3-8b-8192"
        loading={false}
        setLoading={setLoading}
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Type your question...');
    fireEvent.change(inputElement, { target: { value: 'Hello world' } });
    
    expect(inputElement.value).toBe('Hello world');
  });
});