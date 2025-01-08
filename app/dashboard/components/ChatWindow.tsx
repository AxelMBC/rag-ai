"use client";

import React, { useState } from "react";
import SideBar from "../sidebar/Header";
import Message from "./Message";
import Loader from "../../utils/Loader";
import PromptInput from "./PromptInput";
import "../dashboard.scss";

const ChatWindow = () => {
  const [inquiry, setInquiry] = useState("");
  const [answers, setAnswers] = useState<
    { id: string; author: string; message: string }[]
  >([]);

  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <SideBar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      <div
        className="main-container d-flex align-items-center"
        style={{ paddingTop: "100px" }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div
              className="col-12 col-sm-8 col-md-6"
              style={{ marginLeft: "4em" }}
            >
              <h3 className="prompt fw-bold">What is your question?</h3>
              <div style={{ paddingBottom: "200px" }}>
                {answers?.map((answer) => {
                  return (
                    <Message
                      key={answer.id}
                      answerId={answer.id}
                      answerAuthor={answer.author}
                      answerMessage={answer.message}
                    />
                  );
                })}

                {loading && <Loader />}
              </div>
            </div>
          </div>
        </div>

        <PromptInput
          inquiry={inquiry}
          setInquiry={setInquiry}
          selectedModel={selectedModel}
          answers={answers}
          setAnswers={setAnswers}
          setLoading={setLoading}
        />
      </div>
    </>
  );
};

export default ChatWindow;
