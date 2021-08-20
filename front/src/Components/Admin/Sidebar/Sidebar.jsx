import React, { useState } from "react";
import "./Sidebar.css";
import { logoutUser } from "../../../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
  const [menuActive, setMenuActive] = useState(true);
  const [submenuActive, setSubMenuActive] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={`sidebar${menuActive ? " active" : ""}`}>
      <div className="logo_content">
        <div className="logo">
          <i class="bx bx-test-tube"></i>
          <div className="logo_name">OP Tests</div>
        </div>
        <i class="bx bx-menu" id="btn" onClick={() => setMenuActive(!menuActive)}></i>
      </div>
      <ul className="nav_list">
        <li className="mb-3 searchop">
          <i class="bx bx-search" onClick={() => setMenuActive(!menuActive)}></i>
          <input type="text" placeholder="Search..." />
        </li>
        <li className="d-block">
          <button onClick={() => setSubMenuActive(!submenuActive)}>
            <i class="bx bx-check-square"></i>
            <span className="links_name">Exams</span>
            <i class="bx bx-caret-down text-end"></i>
          </button>
          <ul className={`submenu${submenuActive ? " active" : ""}`}>
            <li>
              <Link to="/create-exam">Add New Exam</Link>
            </li>
            <li>
              <Link to="/exams">Browse Exams</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/results">
            <i class="bx bxs-report"></i>

            <span className="links_name">Results</span>
          </Link>
        </li>
        <li>
          <button>
            <i class="bx bx-chat"></i>
            <span className="links_name">Messages</span>
          </button>
        </li>
        <li>
          <button>
            <i class="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Analytics</span>
          </button>
        </li>
        <li>
          <button>
            <i class="bx bx-folder"></i>
            <span className="links_name">File Manger</span>
          </button>
        </li>
        <li>
          <button>
            <i class="bx bx-cart-alt"></i>
            <span className="links_name">Orders</span>
          </button>
        </li>
      </ul>
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <img src="profile.jps" alt="profile" />
            <div className="name_job">
              <div className="name">Shadow Jesus</div>
              <div className="job">Web Developer</div>
            </div>
          </div>
          <i
            class="bx bx-log-out"
            id="log_out"
            onClick={() => {
              dispatch(logoutUser());
              history.push("/");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
