"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../styles/global.scss";

export default function Home() {
  const [inquiry, setInquiry] = useState("");
  const [response, setResponse] = useState("");
  console.log("response: ", response);

  const handleSubmit = async () => {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inquiry }),
    });

    const data = await response.json();
    setResponse(data);
  };

  // const handleSubmit = async () => {
  //   const response = await fetch(
  //     "https://api.groq.com/openai/v1/chat/completions",
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         messages: [{ role: "user", content: inquiry }],
  //         model: "llama3-8b-8192",
  //       }),
  //     }
  //   );

  //   const data = await response.json();
  //   console.log("Data: ", data);
  //   setResponse(data);
  // };

  return (
    <div>
      <main>
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ paddingTop: "100px" }}
          >
            <div className="col-12 text-center">
              <p>What is your Question?</p>
            </div>
            <div className="col-8">
              <div className="d-flex">
                <input
                  className="form-control me-4"
                  type="text"
                  name="inquiry"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="col-10">
              {response && (
                <div className="mt-4">
                  <h5>Response:</h5>
                  <pre style={{ color: "white" }}>
                    {response.response.choices[0].message.content}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
