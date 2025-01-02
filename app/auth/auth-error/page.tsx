import { RxExclamationTriangle } from "react-icons/rx";
import "../auth-error.scss";

const AuthErrorPage: React.FC = () => {
  return (
    <div className="auth-error-page">
      <div className="auth-error-card">
        <div className="auth-error mb-2">
          <RxExclamationTriangle className="icon" />

          <p>{"Oops, something went wrong."}</p>
        </div>
        <div>
          <p className="text-black">
            {"To go back to the sign in page, "}

            <a
              href="/api/auth/signin"
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Click Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
