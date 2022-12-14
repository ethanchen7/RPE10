import NavBar from "../SplashPage/NavBar";
import "./index.css";
import ethan from "../../assets/images/EthanChen_Headshot.jpg";
const About = () => {
  return (
    <div>
      <NavBar />
      <div className="splash-body-container">
        <div className="splash-body-header about-header">
          <h1>About</h1>
        </div>

        <div className="about-body-row-1">
          <div className="about-text-container">
            <h2>Why RPE10</h2>
            <p>
              RPE10 is designed to simplify coaching and programming
              communications between athletes and coaches. Modern
              powerlifting/weightlifting/fitness coaching programs are
              communicated through Excel/Google spreadsheets, and progress and
              performance is evaluated through verbal methods. RPE10 aims to
              consolidate these communication methods onto one seamless,
              organized, and visual platform.{" "}
            </p>
            <p>
              <span style={{ fontStyle: "italic" }}>Upcoming Feature:</span>{" "}
              Users are able to login as Coach or Athlete and program/report
              weekly training blocks and performance.
            </p>
          </div>
        </div>
        <div className="about-body-row-1">
          <div className="about-text-container">
            <h2>About Me</h2>
            <p>
              I'm an ex-finance professional turned software engineer. I have a
              passion for weightlifting and fitness, and my hope is that this
              application can demonstrate its purpose as a tool to simplify
              weight training programming.
            </p>
            <p>
              Please check out my other work and my professional social links
              below:
            </p>
          </div>
        </div>
        <div className="about-body-row-1">
          <div className="about-social-container">
            <img src={ethan} alt={"ethan-img"} />
            <div className="about-socials">
              <a href="https://github.com/ethanchen7/">
                <i className="fa-brands fa-github fa-10x"></i>
              </a>
              <a href="https://www.linkedin.com/in/ethan-chen-3b7070127/">
                <i className="fa-brands fa-linkedin fa-10x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
