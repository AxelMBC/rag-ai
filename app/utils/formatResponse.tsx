import React from "react";

export const formatResponse = (content: string) => {
  // Return null if content is undefined or empty
  if (!content) return null;

  // Remove the surrounding angle brackets if they exist
  const cleanContent = content.replace(/^<|>$/g, "").trim();

  // Split content into lines
  const lines = cleanContent.split("\n");
  const formattedLines: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue; // Skip empty lines

    // Handle numbered lists (e.g., "1. **Topic**:")
    if (/^\d+\.\s+\*\*.*\*\*/.test(line)) {
      const parts = line.split("**").map((chunk, index) => {
        if (index % 2 === 1) {
          // Bold parts
          return <strong key={`${i}-${index}`}>{chunk}</strong>;
        }
        return chunk;
      });
      formattedLines.push(
        <div key={i} className="flex gap-2 mb-2">
          {parts}
        </div>
      );
      continue;
    }

    // Handle bold sections within paragraphs
    if (line.includes("**")) {
      const parts = line.split("**").map((chunk, index) => {
        if (index % 2 === 1) {
          // Bold parts
          return <strong key={`${i}-${index}`}>{chunk}</strong>;
        }
        return chunk;
      });
      formattedLines.push(
        <p key={i} className="mb-4">
          {parts}
        </p>
      );
      continue;
    }

    // Handle code blocks
    if (line.startsWith("```")) {
      const codeBlock: string[] = [];
      i++; // Skip the opening ```
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeBlock.push(lines[i]);
        i++;
      }
      formattedLines.push(
        <pre key={i} className="bg-gray-100 p-4 rounded-lg my-4">
          <code>{codeBlock.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Handle bullet points
    if (line.startsWith("* ")) {
      const bulletContent = line.substring(2);
      formattedLines.push(
        <div key={i} className="flex gap-2 mb-2">
          <span>•</span>
          <span>{bulletContent}</span>
        </div>
      );
      continue;
    }

    // Handle regular paragraphs
    formattedLines.push(
      <p key={i} className="mb-4">
        {line}
      </p>
    );
  }

  return formattedLines;
};
