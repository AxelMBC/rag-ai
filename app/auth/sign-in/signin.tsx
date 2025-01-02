"use client";
import { useState, useTransition } from "react";
import { handleGoogleSignIn } from "@/app/lib/auth/googleSignInServerAction";
import "./styles.scss";
import { FcGoogle } from "react-icons/fc";
import { handleEmailSignIn } from "@/app/lib/auth/emailSignInServerAction";

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" as string });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("submitting form: ", formData);
    event.preventDefault();
    try {
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2 className="text-black">Sign In</h2>
        <div className="form-container">
          <form className="email-signin-form" onSubmit={handleSubmit}>
            <input
              className="form-input text-black"
              style={{ backgroundColor: "white" }}
              type="email"
              maxLength={320}
              placeholder="Email Address"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ email: event.target.value });
              }}
              disabled={isPending}
              required
            />
            <button type="submit" className="submit-button">
              Sign in with email
            </button>
          </form>
          <div className="divider">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>
          <div className="social-logins">
            <button
              className="google text-black no-border"
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
