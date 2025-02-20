import "../styles/global.scss";
import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "./lib/auth/checkIsAuthenticated";
import MainChat from "./MainChat";

const Home = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <MainChat />;
  }
};

export default Home;
