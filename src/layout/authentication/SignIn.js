import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthenticationForm from "../../utils/authForm/AuthenticationForm";

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch (e) {
      setError("Failed to sign in");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <AuthenticationForm
        error={error}
        submitHandler={submitHandler}
        emailRef={emailRef}
        passwordRef={passwordRef}
        loading={loading}
        title="Sign In"
      />
    </>
  );
}