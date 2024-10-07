"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../styles/global.scss";

export default function Home() {
  const [inquiry, setInquiry] = useState("");
  const [response, setResponse] = useState(null);
  const [models, setModels] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inquiry }),
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  const handleModels = async () => {
    const res = await fetch("/api/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setModels(data);
    console.log(data);
  };

  return (
    <div className="main-container">
      <main className="content">
        <div className="container">
          <div className="row justify-content-center response-container">
            <div className="col-12 text-center">
              <select>
                {models?.models?.data.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.id}
                  </option>
                ))}
              </select>
              <p className="prompt">What is your question?</p>
            </div>

            {/* AI Response Section */}
            <div className="col-8 text-center">
              {response && !loading && (
                <div className="response-box">
                  <h5>Response:</h5>
                  <p>
                    {response.response?.choices[0]?.message?.content ||
                      "No response available"}
                  </p>
                </div>
              )}

              {/* Loader when fetching */}
              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Chat Input Sticky at the Bottom */}
      <div className="sticky-chat-input">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  name="inquiry"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="Type your question..."
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="col-8 mt-4">
              <div className="input-group">
                <button
                  className="btn btn-primary"
                  onClick={() => handleModels()}
                  disabled={loading}
                >
                  Get Models
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
