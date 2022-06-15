import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
const NotFound = () => {
  const history = useHistory();
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleOnClick = () => {
    history.push("/");
  };
  return (
    <div className="page-not-found-container">
      <h1> 404 </h1>
      <h1>
        {" "}
        Page Not Found <i className="fa-regular fa-face-frown fa-xl"></i>
      </h1>
      <p>Redirecting you in 3 seconds...</p>
      <button className="return-home-btn" onClick={handleOnClick}>
        Return Home Now
      </button>
    </div>
  );
};

export default NotFound;
