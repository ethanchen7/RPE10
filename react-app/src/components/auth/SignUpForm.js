import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import ErrorMessage from "../ErrorMessage";
// may need an add to all users into redux for chat

const SignUpForm = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data.errors) {
        const errors = {};
        if (Array.isArray(data.errors)) {
          data.errors.forEach((error) => {
            const label = error.split(":")[0].slice(0, -1);
            const message = error.split(":")[1].slice(1);
            errors[label] = message;
          });
        } else {
          errors.overall = data;
        }
        setErrorMessages(errors);
      }
    } else {
      const errors = {};
      errors.repeatPassword = "Repeat password doesn't match Password";
      setErrorMessages(errors);
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-signup-form-container">
      <form onSubmit={onSignUp} className="auth-form signup">
        <ErrorMessage label={""} message={errorMessages.overall} />
        <h1>Sign up</h1>
        <div className="auth-input-group">
          <div>
            <input
              type="text"
              name="firstName"
              required={true}
              onChange={updateFirstName}
              value={firstName}
            ></input>
            <label htmlFor="firstName" className="input-label">
              First Name*
            </label>
            <ErrorMessage label={""} message={errorMessages.first_name} />
          </div>
        </div>
        <div className="auth-input-group">
          <div>
            <input
              type="text"
              name="lastName"
              required={true}
              onChange={updateLastName}
              value={lastName}
            ></input>
            <label htmlFor="lastName" className="input-label">
              Last Name*
            </label>
            <ErrorMessage label={""} message={errorMessages.last_name} />
          </div>
        </div>

        <div className="auth-input-group">
          <input
            name="email"
            type="text"
            required={true}
            value={email}
            onChange={updateEmail}
          />
          <label htmlFor="email" className="input-label">
            Email*
          </label>
          <ErrorMessage label={""} message={errorMessages.email} />
        </div>
        <div className="auth-input-group">
          <input
            type="password"
            name="password"
            required={true}
            onChange={updatePassword}
            value={password}
          ></input>
          <label htmlFor="password" className="input-label">
            Password*
          </label>
          <ErrorMessage label={""} message={errorMessages.password} />
        </div>
        <div className="auth-input-group">
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          <label htmlFor="repeatPassword" className="input-label">
            Confirm Password*
          </label>
          <ErrorMessage label={""} message={errorMessages.repeatPassword} />
        </div>
        <button type="submit" className="signupbtn">
          Sign Up
        </button>
        <Link to="/login" className="auth-form-link">
          Already have an account? <span>Log In!</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
