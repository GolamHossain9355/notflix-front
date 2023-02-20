import { Link } from "react-router-dom";
import "./authenticationForm.css";
import Header from "../../layout/header/Header";

export default function AuthenticationForm({
  error,
  message = "",
  submitHandler,
  userNameRef,
  emailRef,
  passwordRef,
  passwordConfirmRef,
  loading,
  title,
}) {
  return (
    <div>
      <Header />
      <div className="auth-page-container">
        <div className="auth-form-container">
          <h1 className="auth-title">{title}</h1>
          <h2 className={`auth-error-title ${error.length && "display"}`}>
            {error}
          </h2>
          <h2 className={`auth-reset-message ${message.length && "display"}`}>
            {message}
          </h2>
          <form className="auth-form" onSubmit={submitHandler}>
            {title === "Sign Up" && (
              <div className="auth-form-inputs">
                <label htmlFor="userName">User Name</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  ref={userNameRef}
                  required
                />
              </div>
            )}

            <div className="auth-form-inputs">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                required
              />
            </div>

            {(title === "Sign In" || title === "Sign Up") && (
              <div className="auth-form-inputs">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  required
                />
              </div>
            )}

            {title === "Sign Up" && (
              <div className="auth-form-inputs">
                <label htmlFor="password-confirm">Confirm Password</label>
                <input
                  type="password"
                  name="password-confirm"
                  id="password-confirm"
                  ref={passwordConfirmRef}
                  required
                />
              </div>
            )}

            <button className="auth-button" type="submit" disabled={loading}>
              {title}
            </button>

            {(title === "Sign In" || title === "Reset Password") && (
              <div className="auth-alternate-group">
                <div className="auth-alternate">
                  Need an account?{" "}
                  <Link className="auth-alternate-link" to="/sign-up">
                    Sign Up
                  </Link>
                </div>
                <div className="auth-alternate">
                  <Link className="reset-password-link" to="/reset-password">
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}
            {(title === "Sign Up" || title === "Reset Password") && (
              <div className="auth-alternate">
                Already have an account?{" "}
                <Link className="auth-alternate-link" to="/sign-in">
                  Sign In
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}