import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../app/MainChat/Message";

describe("Page", () => {
  it("Renders 'Author' text on Message component", () => {
    render(<Message answerId="1" answerAuthor="User" answerMessage="What is an llm?" />);
    const heading = screen.getByRole("heading", { level: 5 });
    expect(heading).toBeInTheDocument();
  });
});
