import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import logo from "../../../assets/images/rpelogo.png";
import { MdDashboard } from "react-icons/md";
import { TbPencil } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineExperiment } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
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

  const onLogout = async (e) => {
    history.push("/");
    await dispatch(logout());
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="sidebar-menu main">
        <div className="sidebar-menu-item">
          <NavLink
            to="/"
            exact={true}
            activeClassName="selected"
            data-tip="Dashboard"
          >
            <MdDashboard
              style={{ width: "32px", height: "auto", color: "#a4a8a8" }}
            />
          </NavLink>
          <ReactTooltip
            className="tool-tip-cls"
            place="bottom"
            type="dark"
            effect="solid"
          />
        </div>
        <div
          className={`sidebar-menu-item`}
          onClick={() => setOpenBlock(!openBlock)}
        >
          <i
            className="fa-solid fa-bars-progress fa-2xl"
            style={{ color: "#a4a8a8" }}
            data-tip="Blocks"
          ></i>
          <ReactTooltip
            className="tool-tip-cls"
            place="bottom"
            type="dark"
            effect="solid"
          />
        </div>
        <div className={`blocks-nav-container${openBlock ? " open" : ""}`}>
          {blocks.map((block, idx) => (
            <NavLink
              to={`/${block.id}`}
              exact={true}
              activeClassName="selected"
              key={`nav-to-${block.id}`}
            >{`Block ${idx + 1}`}</NavLink>
          ))}
        </div>
        <div className="sidebar-menu-item">
          <NavLink to="/program" exact={true} activeClassName="selected">
            <i
              class="fa-solid fa-flask fa-2xl"
              style={{ color: "#a4a8a8" }}
              data-tip="Program"
            ></i>
          </NavLink>
          <ReactTooltip
            className="tool-tip-cls"
            place="bottom"
            type="dark"
            effect="solid"
          />
        </div>
        <div className="sidebar-menu-item">
          <NavLink to="/" exact={true} activeClassName="selected">
            <i
              class="fa-regular fa-message fa-2xl"
              style={{ color: "#a4a8a8" }}
              data-tip="Chat"
            ></i>
          </NavLink>
          <ReactTooltip
            className="tool-tip-cls"
            place="bottom"
            type="dark"
            effect="solid"
          />
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="person-icon">
          <div
            className={`person-circle-icon`}
            onClick={() => setMenuToggle(!menuToggle)}
          >
            <p>{`${sessionUser?.first_name
              .charAt(0)
              .toUpperCase()}${sessionUser?.last_name
              .charAt(0)
              .toUpperCase()}`}</p>
          </div>
          <div className={`menu${menuToggle ? " active" : ""}`}>
            <p>{`${sessionUser?.first_name} ${sessionUser?.last_name}`}</p>
            <ul>
              <li>
                <i
                  className="fa-regular fa-pencil"
                  style={{ marginRight: "4px", color: "white" }}
                ></i>
                <span>Edit Name</span>
              </li>
              <li onClick={() => onLogout()}>
                <BiLogOutCircle style={{ marginRight: "4px", width: "14px" }} />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
