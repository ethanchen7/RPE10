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
            <h3>Lol.</h3>
            <p>Best project ever?</p>
          </div>
        </div>

        {/* <img src={iphone} className="splash-iphone" /> */}
      </div>
    </div>
  );
};

export default SplashPage;
