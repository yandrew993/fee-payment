import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import StoreIcon from "@mui/icons-material/Store";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useRef } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { canViewUsers } from "../../lib/rbac";


// Helper function to clear cookies
const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const { user, updateUser } = useContext(AuthContext);
  const logoutInProgress = useRef(false);
  const navigate = useNavigate();
  
  // Check if user can view users section
  const userCanViewUsers = canViewUsers(user);

  const handleLogout = async () => {
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;

    try {
      await apiRequest.post("/auth/logout");

      if (updateUser) updateUser(null);
      localStorage.clear();
      sessionStorage.clear();
      clearCookies();

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Fee Management</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">MANAGEMENT</p>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/classes" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Classes</span>
            </li>
          </Link>
          <Link to="/class-fees" style={{ textDecoration: "none" }}>
            <li>
              <EventIcon className="icon" />
              <span>Class Fees</span>
            </li>
          </Link>
          <Link to="/fee-payments" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon className="icon" />
              <span>Fee Payments</span>
            </li>
          </Link>
          <Link to="/receipts" style={{ textDecoration: "none" }}>
            <li>
              <EventIcon className="icon" />
              <span>Receipts</span>
            </li>
          </Link>
          <Link to="/academic-years" style={{ textDecoration: "none" }}>
            <li>
              <CalendarTodayIcon className="icon" />
              <span>Academic Years</span>
            </li>
          </Link>
          {userCanViewUsers && (
            <>
              <p className="title">ADMINISTRATION</p>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="bottom">
        <ul>
          <p className="title">USER</p>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
