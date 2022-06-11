import LoginForm from "../LoginForm";

import rpelogo from "../../../assets/images/rpelogo.png";
import "./index.css";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src={rpelogo} alt="logo" className="auth-logo" />
        <p>RPE10</p>
      </div>
      <div className="auth-body">
        <LoginForm />
      </div>
    </div>
  );
};
export default AuthPage;
