import { useRef, useState, useEffect, useReducer } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import profileImages from "../../../data/profileImages";
import "./editProfile.css";

const reducer = (state, action) => {
  switch (action.type){
    case "selectIMG":
      return { ...state, selectedIMG: action.payload };
    case "usernameActive":
      return { ...state, username: true, clicked: true  };
    case "passwordActive":
      return { ...state, password: true, clicked: true  };
    case "emailActive":
      return { ...state, email: true, clicked: true  };
    case "userIconActive":
      return { ...state, userIcon: true, clicked: true  };
    default:
      throw new Error();
  }
}

export default function EditProfile({ inactive, setInactive }) {
  const [ error, setError ] = useState({active: false, message: ""});

  const [state, dispatch] = useReducer(reducer, {
    selectedIMG: 0,
    clicked: false,
    username: false,
    password: false,
    email: false,
    userIcon: false,
  })

  const userNameRef = useRef();
  const confirmEmailRef = useRef();
  const emailRef = useRef();
  const confirmPasswordRef = useRef();
  const passwordRef = useRef();

  const { currentUser, updateProfile, updateEmail, updatePassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { 
    dispatch({type: "selectIMG", payload: Number(currentUser.photoURL)})
  }, [currentUser.photoURL]);

  const handleButtonClick = (value) => {
    if(value === "username") dispatch({ type: "usernameActive" });
    if(value === "email") dispatch({ type: "emailActive" });
    if(value === "password") dispatch({ type: "passwordActive" });
    if(value === "userIcon") dispatch({ type: "userIconActive" });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
    await updateProfile({
      photoURL: state.selectedIMG,
      displayName: userNameRef.current.value || currentUser.displayName,
    });

    if(emailRef.current.value !== "" && confirmEmailRef.current.value === emailRef.current.value) await updateEmail(emailRef.current.value);
    else if (emailRef.current.value !== "") throw new Error("The e-mail addresses do not match.")

    if(passwordRef.current.value !== ""){
      if(confirmPasswordRef.current.value === passwordRef.current.value) await updatePassword(passwordRef.current.value)
      else if (passwordRef.current.value !== "") throw new Error("The passwords do not match.")
    }

    if(!inactive) setInactive(true);
    navigate("/");
  } catch(err) {
    console.error(err.message);
    setError({active: true, message: err.message});
  }
}

  return (
    <div className="edit-prof__wrapper">
      <div className={`${!error.active ? "error--hide" : "error"}`}>{error.message}</div>
      <form className="edit-prof__form" onSubmit={submitHandler}>
        
      <button type="button" className={`display-button ${state.username ? "hide" : ""}`} onClick={() => handleButtonClick("username")}>Change Username</button>
        <div className={`edit-prof__input--section ${ state.username ? "" : "hide" }`}>
          <label className="edit-prof__label">Username</label>
          <input
            className="edit-prof__input"
            id="userName"
            name="userName"
            placeholder={currentUser.displayName}
            ref={userNameRef}
          />
        </div>

        <button type="button" className={`display-button ${state.password ? "hide" : ""}`} onClick={() => handleButtonClick("password")}>Change Password</button>
        <div className={`edit-prof__input--section ${ state.password ? "" : "hide" }`}>
          <label className="edit-prof__label">Password</label>
          -New Password
          <input
            className="edit-prof__input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            ref={confirmPasswordRef}
          />
          <div className="edit-prof__input--sub">-Confirm Password</div>
          <input
            className="edit-prof__input"
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
          />
        </div>

        <button type="button" className={`display-button ${state.email ? "hide" : ""}`} onClick={() => handleButtonClick("email")}>Change E-Mail</button>
        <div className={`edit-prof__input--section ${ state.email ? "" : "hide" }`}>
          <label className="edit-prof__label">E-Mail</label>
          <input
            className="edit-prof__input"
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            placeholder={currentUser.email}
            ref={confirmEmailRef}
          />
          <div className="edit-prof__input--sub">-Confirm E-Mail Address</div>
          <input
            className="edit-prof__input"
            type="email"
            id="email"
            name="email"
            ref={emailRef}
          />
        </div>

        <button type="button" className={`display-button ${state.userIcon ? "hide" : ""}`} onClick={() => handleButtonClick("userIcon")}>Change User Icon</button>
        <div className={`edit-prof__input--section ${ state.userIcon ? "" : "hide" }`}>
          <label className="edit-prof__label">User Icon</label>
          <div className="edit-prof__user-icon--grid">
            {profileImages.map((image, i) => {
              return (
                <img
                  key={i}
                  onClick={() => dispatch({type: "selectIMG", payload: i})}
                  className={`edit-prof__user-icon ${state.selectedIMG === i ? "icon-highlight" : ""}`}
                  alt=""
                  src={image.img}
                />
              );
            })}
          </div>
        </div>

        <div className={`edit-prof__form--submit ${state.clicked ? "" : "hide"}`}>
          <button className="edit-prof__form--button" type="submit">
            Save
          </button>
        </div>

      </form>
    </div>
  );
}