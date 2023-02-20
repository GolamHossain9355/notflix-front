import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthenticationForm from "../../utils/authForm/AuthenticationForm";

export default function SignUp() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp, updateProfile } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      await signUp(emailRef.current.value, passwordRef.current.value);
      await updateProfile({displayName: userNameRef.current.value, photoURL: "0"})

      navigate("/", { replace: true });
    } catch (e) {
      setError("Failed to sign up");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <AuthenticationForm
        error={error}
        submitHandler={submitHandler}
        userNameRef={userNameRef}
        emailRef={emailRef}
        passwordRef={passwordRef}
        passwordConfirmRef={passwordConfirmRef}
        loading={loading}
        title="Sign Up"
      />
    </>
  );
}