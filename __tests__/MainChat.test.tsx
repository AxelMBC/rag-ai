import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MainChat from '../app/MainChat';

describe('MainChat Component', () => {
  it('renders the prompt heading', () => {
    render(<MainChat />);
    const promptHeading = screen.getByText(/What is your question\?/i);
    expect(promptHeading).toBeInTheDocument();
  });
});