"use client";

import { formatResponse } from "../../utils/formatResponse";
import { capitalizeFirstLetter } from "../../utils/usefulFunctions";
import { MessagePropsType } from "../../types/MessageType";

const Message = ({ answerId, answerAuthor, answerMessage }: MessagePropsType) => {
  return (
    <div id={answerId} className="response-box bg-transparent" key={answerId}>
      <h5
        style={{
          fontWeight: "600",
          color: `${answerAuthor === "user" ? "#009bd6" : "red"}`,
        }}
      >
        {capitalizeFirstLetter(answerAuthor)}:
      </h5>
      <span>{formatResponse(answerMessage)}</span>
    </div>
  );
};

export default Message;
