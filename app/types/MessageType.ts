export interface MessageType {
  id: string;
  role: string;
  content: string;
}

export interface MessagePropsType {
  answerId: string;
  answerAuthor: string;
  answerMessage: string;
}
