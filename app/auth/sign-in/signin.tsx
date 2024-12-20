"use client";
import { handleGoogleSignIn } from "@/app/lib/auth/googleSignInServerAction";
import "./styles.scss";
import { FcGoogle } from "react-icons/fc";

const SignInPage: React.FC = () => {
  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
          <div className="social-logins">
            <button
              className="google"
              onClick={() => {
                handleGoogleSignIn();
              }}
            >
              <FcGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
