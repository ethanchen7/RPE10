import NavBar from "./NavBar";
import mac from "../../assets/images/rpe10-splash-mac.png";
import iphone from "../../assets/images/transparentiphone.png";
import "./index.css";

const SplashPage = () => {
  return (
    <div>
      <NavBar />
      <div>Splash</div>
      <img src={mac} className="splash-mac" />
      <img src={iphone} className="splash-iphone" />
    </div>
  );
};

export default SplashPage;
