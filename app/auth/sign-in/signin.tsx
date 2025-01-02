"use client";
import { useState } from "react";
import { handleGoogleSignIn } from "@/app/lib/auth/googleSignInServerAction";
import "./styles.scss";
import { FcGoogle } from "react-icons/fc";
import { handleEmailSignIn } from "@/app/lib/auth/emailSignInServerAction";

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" as string });

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("submitting form: ", formData);
    event.preventDefault();
    try {
      await handleEmailSignIn(formData.email);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
          <form className="email-signin-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="email"
              maxLength={320}
              placeholder="Email Address"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({ email: event.target.value });
              }}
            />
            <button type="submit">Sign in via email</button>
          </form>
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
