import React, { useState } from "react";
import { inputData } from "./data";
import { validateInput, handleInput } from "./utilities/handleChanges";
import { handleFormSubmit  } from "./SignUp_LoginScript";
import InputBase from "./InputBase";
import "./SignUp_Login.css";

function SignUp_Login({
  setShowSignUpLogin,
  users,
  setUsers,
  setUserLoggedIn,
}) {
  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    postalCode: "",
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const handleBlur = ({ target: { name, value } }) => {
    const validationError = validateInput(name, value, inputs, users, isSignUp);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError }));
  };

  const toggleMode = () => {
    setIsSignUp((prevMode) => !prevMode);
    setInputs({
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      postalCode: "",
    });
    setErrors({});
  };

  return (
    <div className="auth-modal" id="sign-up-login-modal">
      <div className="logInOptions">
        <h3>{isSignUp ? "Create Account" : "Login"}</h3>
        <button onClick={() => setShowSignUpLogin(false)}>CLOSE</button>
      </div>

      <form
        onSubmit={(event) =>
          handleFormSubmit(event, {
            errors,
            inputs,
            setInputs,
            users,
            setUsers,
            setShowSignUpLogin,
            setUserLoggedIn,
            isSignUp
          })
        }
      >
        {inputData.map((item) => {
          const nonLoginInputs = [
            "passwordConfirm",
            "firstName",
            "lastName",
            "postalCode",
          ];

          if (!isSignUp && nonLoginInputs.includes(item.name)) {
            return null;
          }

          return (
            <InputBase
              className={item.className}
              key={item.name}
              placeholder={
                isSignUp
                  ? item.label
                  : item.name === "password"
                  ? "Enter password"
                  : item.label
              }
              type={item.type}
              value={inputs[item.name]}
              onChange={handleInput(setInputs)}
              name={item.name}
              onBlur={handleBlur}
              error={errors[item.name]}
            />
          );
        })}

        <div className="btn-wrapper">
          <input type="submit" value={isSignUp ? "Create Account" : "Login"} />
        </div>
      </form>

      <div className="switch-mode">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <button onClick={toggleMode}>Switch to Login</button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button onClick={toggleMode}>Switch to Sign Up</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp_Login;
