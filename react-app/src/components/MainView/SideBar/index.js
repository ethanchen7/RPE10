import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import logo from "../../../assets/images/rpelogo.png";
import "./index.css";

const SideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    history.push("/");
    await dispatch(logout());
  };
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="sidebar-menu main">
        <div className="sidebar-menu-item">
          <span>
            <i className="fa-solid fa-house fa-lg"></i>
          </span>
          <NavLink to="/" exact={true} activeClassName="selected">
            Dashboard
          </NavLink>
        </div>
        <div className="sidebar-menu-item">
          <span>
            <i className="fa-solid fa-bars-progress fa-lg"></i>
          </span>
          <NavLink to="/" exact={true} activeClassName="selected">
            Blocks
          </NavLink>
        </div>
        <div className="sidebar-menu-item">
          <span>
            <i className="fa-regular fa-circle-check fa-lg"></i>
          </span>
          <NavLink to="/program" exact={true} activeClassName="selected">
            Program
          </NavLink>
        </div>
        <div className="sidebar-menu-item">
          <span>
            <i className="fa-solid fa-user fa-lg"></i>
          </span>
          <NavLink to="/" exact={true} activeClassName="selected">
            Chat
          </NavLink>
        </div>
      </div>
      {/* <div className="sidebar-menu secondary">
        <div className="sidebar-menu-item" onClick={onLogout}>
          <span>
            <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
          </span>
          <span>Logout</span>
        </div>
      </div> */}
      <div className="sidebar-footer">
        <div className="person-icon">
          <div className={`person-circle-icon`}>
            <p>{`${sessionUser?.first_name
              .charAt(0)
              .toUpperCase()}${sessionUser?.last_name
              .charAt(0)
              .toUpperCase()}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
