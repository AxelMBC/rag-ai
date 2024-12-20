"use server";

import { auth } from "./authConfig";

export const checkIsAuthenticated = async () => {
  const session = await auth();
  if (session) {
    return true;
  } else {
    return false;
  }
};
