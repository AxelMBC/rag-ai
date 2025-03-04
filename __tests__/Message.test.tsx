import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "../app/MainChat/Message";
import { MessagePropsType } from "../app/types/MessageType";

describe("Message Component", () => {
  const setup = (props: MessagePropsType) => {
    return render(<Message {...props} />);
  };

  test("renders author text correctly", () => {
    setup({
      answerId: "7656184b-e54d-42ff-877b-9fb38a901eca",
      answerAuthor: "User",
      answerMessage: "What is an llm?",
    });

    const heading = screen.getByRole("heading", { level: 5 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("User:");
  });

  test("renders message content correctly", () => {
    setup({
      answerId: "7656184b-e54d-42ff-877b-9fb38a901eca",
      answerAuthor: "User",
      answerMessage: "What is an llm?",
    });

    const messageText = screen.getByText("What is an llm?");
    expect(messageText).toBeInTheDocument();
  });

  test("renders correct color for user", () => {
    setup({
      answerId: "7656184b-e54d-42ff-877b-9fb38a901eca",
      answerAuthor: "user",
      answerMessage: "Test message",
    });
    const heading = screen.getByRole("heading", { level: 5 });
    expect(heading).toBeInTheDocument();
    const computedStyle = window.getComputedStyle(heading);
    expect(computedStyle.color).toMatch(/rgb\(0, 155, 214\)|#009bd6/i);
  });

  test("renders correct color for non-user author", () => {
    setup({
      answerId: "7656184b-e54d-42ff-877b-9fb38a901eca",
      answerAuthor: "Llama3-8b-8192",
      answerMessage: "Test message",
    });
    const heading = screen.getByRole("heading", { level: 5 });
    expect(heading).toBeInTheDocument();
    const computedStyle = window.getComputedStyle(heading);
    expect(computedStyle.color).toMatch("red");
  });
});
