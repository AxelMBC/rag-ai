export const formatResponse = (content: string) => {
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
    } else if (line.startsWith("* **")) {
      // Handle bullet points with bold text
      const parts = line
        .split("**")
        .map((chunk, index) =>
          index % 2 === 0 ? chunk : <strong key={i + index}>{chunk}</strong>
        );
      formattedLines.push(<p key={i}>• {parts}</p>); // Render as a bullet point
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
        <pre key={i} className="bg-dark px-3 py-4">
          <code>{codeBlock.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("* ")) {
      const boldFormatted = line.split("*").map((chunk, index) =>
        index % 2 === 0 ? (
          chunk
        ) : (
          <li
            key={i + index}
            style={{ listStyleType: "circle", marginLeft: "10px" }}
          >
            {chunk}
          </li>
        )
      );
      formattedLines.push(boldFormatted);
    } else if (line) {
      // Handle regular paragraphs
      formattedLines.push(<p key={i}>{line}</p>);
    }
  }

  return formattedLines;
};
