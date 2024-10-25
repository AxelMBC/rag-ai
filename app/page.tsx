"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../styles/global.scss";
import { ResponseType } from "./types/Inquiry";
import { groqModels } from "./AIModels/groqModels";

export default function Home() {
  const [inquiry, setInquiry] = useState("");
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [thread, setThread] = useState<{ author: string; message: string }[]>(
    []
  );
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192");
  const [loading, setLoading] = useState(false);
  console.log("Thread: ", thread);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/inquiry", {
      method: "POST",
      body: JSON.stringify({ inquiry, model: selectedModel }),
    });

    const data = await res.json();
    thread.push({ author: "User Client", message: inquiry });
    thread.push({
      author: data.response.model,
      message: data.response.choices[0].message.content,
    });
    setResponse(data);
    setLoading(false);
  };

  console.log("response: ", response);

  const formatResponse = (content) => {
    // Ensure content is defined and is a string.
    if (!content) return null;

    const lines = content.split("\n");
    const formattedLines = []; // Array to hold formatted JSX elements

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim(); // Trim each line

      if (line.startsWith("###")) {
        // Handle headings
        formattedLines.push(
          <h3 key={i} style={{ fontWeight: 700 }}>
            {line.replace("###", "").trim()}
          </h3>
        );
      } else if (line.startsWith("**")) {
        // Handle bold text, split and alternate between regular and bold text
        const boldFormatted = line
          .split("**")
          .map((chunk, index) =>
            index % 2 === 0 ? chunk : <strong key={i + index}>{chunk}</strong>
          );
        formattedLines.push(<p key={i}>{boldFormatted}</p>);
      } else if (line.startsWith("```")) {
        // Handle code blocks
        const codeBlock = [];
        i++; // Skip opening ```
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeBlock.push(lines[i]);
          i++;
        }
        formattedLines.push(
          <pre key={i} className="bg-dark py-4">
            <code>{codeBlock.join("\n")}</code>
          </pre>
        );
      } else if (line) {
        // Handle regular paragraphs
        formattedLines.push(<p key={i}>{line}</p>);
      }
    }

    return formattedLines;
  };

  return (
    <div className="main-container">
      <main className="content">
        <div className="container">
          <div className="row justify-content-center response-container">
            <div className="col-12 text-center">
              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                }}
              >
                {groqModels.map((model) => (
                  <option key={model.id}>{model.id}</option>
                ))}
              </select>
              <p className="prompt">What is your question?</p>
            </div>

            <div className="col-8" style={{ paddingBottom: "200px" }}>
              {response && !loading && (
                <div className="response-box">
                  <h5>Response:</h5>
                  <p>
                    {formatResponse(
                      response.response.choices[0].message.content
                    )}
                  </p>
                </div>
              )}

              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="sticky-chat-input">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <hr />
            </div>
            <div className="col-8">
              <div className="input-group">
                <input
                  className="form-control me-4"
                  type="text"
                  name="inquiry"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="Type your question..."
                />
                <div
                  className="d-flex justify-content-center align-items-center cursor-pointer"
                  onClick={() => handleSubmit()}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                  }}
                >
                  <i className="fas fa-arrow-up" style={{ color: "black" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
