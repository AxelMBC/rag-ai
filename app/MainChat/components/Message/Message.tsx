"use client";
<<<<<<< HEAD
=======

>>>>>>> dev
import { formatResponse } from "../../../utils/formatResponse";

interface MessageProps {
  answerId: string;
  answerAuthor: string;
  answerMessage: string;
}

const Message = ({ answerId, answerAuthor, answerMessage }: MessageProps) => {
  return (
    <div id={answerId} className="response-box bg-transparent" key={answerId}>
      <h5
        style={{
          fontWeight: "600",
          color: `${answerAuthor === "User" ? "#009bd6" : "red"}`,
        }}
      >
        {answerAuthor}:
      </h5>
      <span>{formatResponse(answerMessage)}</span>
    </div>
  );
};

export default Message;
