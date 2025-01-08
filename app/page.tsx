import { checkIsAuthenticated } from "./lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import MainChat from "./dashboard/components/ChatWindow";
import "../styles/global.scss";

const Home = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <MainChat />;
  }
};

export default Home;
