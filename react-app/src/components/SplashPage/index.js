import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import mac from "../../assets/images/rpe10-splash-mac.png";
import iphone from "../../assets/images/transparentiphone.png";
import together from "../../assets/images/together.png";
import "./index.css";

const SplashPage = () => {
  return (
    <div>
      <NavBar />
      <div className="splash-body-container">
        <div className="splash-body-header">
          <h1>Train efficiently.</h1>
          <h2>Ditch the spreadsheets.</h2>
        </div>
        <div className="get-started-btn-container">
          <button className="splash-getstarted-btn">
            <NavLink to="/login" exact={true} activeClassName="active">
              Get Started
            </NavLink>
          </button>
        </div>
        <div className="splash-body-row-1">
          <img src={together} className="splash-mac" />
          <div className="description-box-row-1">
            <h3>Workout Programming</h3>
            <p>
              Plan out your training periodizations ahead of time and view your
              workouts by block, week, and day.
            </p>
            <h3>Volume and RPE Tracking</h3>
            <p>
              Understand the load you are putting on your body with each
              workout. See your average volume and RPE reports conveniently.
              Adjust your workouts accordingly.
            </p>
            <h3>Evaluating Your Plan</h3>
            <p>
              Leave notes on each day for any thoughts you have on the workout,
              things you want to keep in mind, or how to improve for next time.
            </p>
            <h3>Build a Community</h3>
            <p>
              Chat with other athletes over the messaging platform. Network with
              coaches, trainers, and other like-minded individuals.
            </p>
          </div>
        </div>

        {/* <img src={iphone} className="splash-iphone" /> */}
      </div>
    </div>
  );
};

export default SplashPage;
