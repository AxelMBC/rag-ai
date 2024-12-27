import SignInPage from "./signin";
import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "../../lib/auth/checkIsAuthenticated";

const SignIn: React.FC = async () => {
  // const isAuthenticated = await checkIsAuthenticated();
  const isAuthenticated = await checkIsAuthenticated();
  console.log("isAuthenticated: ", isAuthenticated);
  if (isAuthenticated) {
    redirect("/");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
