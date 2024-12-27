"use server";
import { signOut } from "./authConfig";

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (err) {
    throw err;
  }
};
