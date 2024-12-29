import { checkIsAuthenticated } from "./lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../styles/global.scss";
import MainChat from "./chat/main";

const Home = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <MainChat />;
  }
};

export default Home;
