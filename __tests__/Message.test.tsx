import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../app/MainChat/Message";

describe("Message Component", () => {
  it("Renders 'Author' text", () => {
    render(
      <Message
        answerId="7656184b-e54d-42ff-877b-9fb38a901eca"
        answerAuthor="User"
        answerMessage="What is an llm?"
      />
    );
    const heading = screen.getByRole("heading", { level: 5 });
    expect(heading).toBeInTheDocument();
  });

  it("Renders message content text", () => {
    render(
      <Message
        answerId="7656184b-e54d-42ff-877b-9fb38a901eca"
        answerAuthor="User"
        answerMessage="What is an llm?"
      />
    );
    const heading = screen.getByText("What is an llm?");
    expect(heading).toBeInTheDocument();
  });
});
