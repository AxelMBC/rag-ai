import { render, screen, fireEvent } from "@testing-library/react";
import PromptInput from "../app/MainChat/PromptInput";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock fetch with a proper Response object
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      status: 200, // Add required status
      statusText: "OK", // Add required statusText
      headers: new Headers(), // Add required headers
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: "bot response" } }],
          model: "someModel",
        }),
      // Add other required properties as minimal stubs
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(""),
    } as Response) // Type assertion to tell TypeScript this matches Response
);

describe("PromptInput", () => {
  test("does not submit empty prompt", () => {
    const setMessages = jest.fn();
    const setLoading = jest.fn();

    render(
      <PromptInput
        messages={[]}
        setMessages={setMessages}
        conversationalMemory={false}
        selectedModel="model1"
        loading={false}
        setLoading={setLoading}
      />
    );

    const input = screen.getByPlaceholderText("Type your question...");
    fireEvent.change(input, { target: { value: " " } });
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(setMessages).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalledWith(true);
  });
});
