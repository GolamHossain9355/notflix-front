import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AuthenticationForm from "../../utils/authForm/AuthenticationForm";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();
  const emailRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      setMessage("");
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for farther instructions");
    } catch (e) {
      setError("Failed to reset password");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <AuthenticationForm
      emailRef={emailRef}
      error={error}
      loading={loading}
      message={message}
      submitHandler={submitHandler}
      title="Reset Password"
    />
  );
}