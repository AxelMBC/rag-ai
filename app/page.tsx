import { checkIsAuthenticated } from "./lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import ChatWindow from "./dashboard/ChatWindow";
import "../styles/global.scss";

const Home = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <ChatWindow />;
  }
};

export default Home;
