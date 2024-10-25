export interface ResponseType {
  response: {
    choices: {
      message: {
        content: string;
      };
    }[];
  };
}
