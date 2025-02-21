"use client";
import "./MainChatStyle.scss";
import { useState } from "react";
import Header from "./Header";
import Message from "./Message";
import PromptInput from "./PromptInput";
import Loader from "../utils/Loader";
import { MessageType } from "../types/MessageType";

const ChatWindow = () => {
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [conversationalMemory, setConversationalMemory] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        conversationalMemory={conversationalMemory}
        setConversationalMemory={setConversationalMemory}
      />
      <div className="main-container d-flex align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-xl-7 col-xxl-6 ml-4">
              <h3 className="prompt fw-bold">What is your question?</h3>
              <div className="answers-container">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    answerId={message.id}
                    answerAuthor={message.role}
                    answerMessage={message.content}
                  />
                ))}
                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
        <PromptInput
          messages={messages}
          setMessages={setMessages}
          conversationalMemory={conversationalMemory}
          selectedModel={selectedModel}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default ChatWindow;
