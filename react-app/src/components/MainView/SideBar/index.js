import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import logo from "../../../assets/images/rpelogo.png";
import { MdDashboard } from "react-icons/md";
import EditNameModal from "./EditName";
import ReactTooltip from "react-tooltip";
import "./index.css";

const SideBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const blockObjects = useSelector((state) => state.block);
  const blocks = Object.values(blockObjects);

  const [menuToggle, setMenuToggle] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);

  const handleBlocksClick = (e) => {
    e.stopPropagation();
    if (
      e.target.id === "block-toggler" ||
      e.target.id === "block-toggler-icon"
    ) {
      setOpenBlock(!openBlock);
    }
  };
  const handleMenuClick = (e) => {
    e.stopPropagation();
    if (e.target.id === "menu-toggler" || e.target.id === "menu-toggler-text") {
      setMenuToggle(!menuToggle);
    }
  };
  window.onclick = function (event) {
    event.stopPropagation();
    if (
      event.target.id !== "menu-toggler" &&
      event.target.id !== "menu-toggler-text"
    ) {
      setOpenBlock(false);
    }
    if (event.target.id !== "block-toggler") {
      setMenuToggle(false);
    }
  };

  const handleLogoClick = () => {
    history.push("/");
  };

  const onLogout = async (e) => {
    history.push("/");
    await dispatch(logout());
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-container" onClick={handleLogoClick}>
        <img src={logo} alt="logo" />
      </div>
      <div className="sidebar-menu main">
        <div className="sidebar-menu-item">
          <NavLink
            to="/"
            exact={true}
            activeClassName="selected"
            data-tip="Dashboard"
            data-for="dashboard-tool-tip"
          >
            <MdDashboard
              style={{ width: "32px", height: "auto", color: "#a4a8a8" }}
            />
          </NavLink>
          <ReactTooltip
            className="tool-tip-cls"
            place="right"
            type="dark"
            effect="solid"
            id="dashboard-tool-tip"
          />
        </div>
        <div
          className={`sidebar-menu-item`}
          id="block-toggler"
          onClick={handleBlocksClick}
        >
          <i
            className="fa-solid fa-bars-progress fa-2xl"
            style={{ color: "#a4a8a8" }}
            id="block-toggler-icon"
            data-tip={`Blocks${blocks.length ? "" : " (currently no blocks)"}`}
          ></i>
          <ReactTooltip
            className="tool-tip-cls"
            place="right"
            type="dark"
            effect="solid"
          />
        </div>
        {blocks.length ? (
          <div className={`blocks-nav-container${openBlock ? " open" : ""}`}>
            {blocks.map((block, idx) => (
              <Link
                to={{
                  pathname: `/block/${block.id}`,
                  state: { number: idx + 1 },
                }}
                key={`nav-to-${block.id}`}
              >{`Block ${idx + 1}`}</Link>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="sidebar-menu-item">
          <NavLink to="/program" exact={true} activeClassName="selected">
            <i
              className="fa-solid fa-flask fa-2xl"
              style={{ color: "#a4a8a8" }}
              data-tip="Program"
            ></i>
          </NavLink>
          <ReactTooltip
            className="tool-tip-cls"
            place="right"
            type="dark"
            effect="solid"
          />
        </div>
        <div className="sidebar-menu-item">
          {/* add back in later */}
          {/* <NavLink to="/" exact={true} activeClassName="selected">
            <i
              className="fa-regular fa-message fa-2xl"
              style={{ color: "#a4a8a8" }}
              data-tip="Chat"
            ></i>
          </NavLink>
          <ReactTooltip
            className="tool-tip-cls"
            place="right"
            type="dark"
            effect="solid"
          /> */}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="person-icon">
          <div
            className={`person-circle-icon`}
            id={`menu-toggler`}
            onClick={handleMenuClick}
            onBlur={() => setMenuToggle(false)}
          >
            <p id={`menu-toggler-text`}>{`${sessionUser?.first_name
              .charAt(0)
              .toUpperCase()}${sessionUser?.last_name
              .charAt(0)
              .toUpperCase()}`}</p>
          </div>
          <div className={`menu${menuToggle ? " active" : ""}`}>
            <h3>{`${sessionUser?.first_name} ${sessionUser?.last_name}`}</h3>
            <div className="sub-menu">
              <EditNameModal />
              <p onClick={() => onLogout()}>
                <i className="fa-solid fa-arrow-right-from-bracket fa-lg" />
                <span>Logout</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
