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
          <h1>Put some clever header here</h1>
          <h3>Some more stuff.</h3>
          <h3>Welcome aboard RPE10</h3>
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
