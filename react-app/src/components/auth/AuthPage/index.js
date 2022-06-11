import LoginForm from "../LoginForm";
import rpelogo from "../../../assets/images/rpelogo.png";
import "./index.css";
import SignUpForm from "../SignUpForm";

const AuthPage = () => {
  const page = window.location.href.split("/").at(-1);

  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src={rpelogo} alt="logo" className="auth-logo" />
        <p>RPE10</p>
      </div>
      <div className="auth-body">
        {page === "login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
};
export default AuthPage;
