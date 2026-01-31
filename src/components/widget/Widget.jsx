import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;
  
  const apiUrl = type === "student"
    ? "/students"
    : type === "class"
    ? "/classes"
    : type === "fee-payment"
    ? "/fee-payments"
    : type === "receipt"
    ? "/receipts"
    : null;

  const { data: apiData, loading, error } = useFetch(apiUrl || "");

  // Count items from API response
  const itemCount = Array.isArray(apiData) ? apiData.length : 0;

  switch (type) {
    case "student":
      data = {
        title: "STUDENTS",
        isMoney: false,
        link: (
          <Link to="/students" style={{ textDecoration: "none", color: "blue" }}>
            See all students
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "class":
      data = {
        title: "CLASSES",
        isMoney: false,
        link: (
          <Link to="/classes" style={{ textDecoration: "none", color: "blue" }}>
            See all classes
          </Link>
        ),
        icon: (
          <SchoolOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "fee-payment":
      data = {
        title: "FEE PAYMENTS",
        isMoney: false,
        link: (
          <Link to="/fee-payments" style={{ textDecoration: "none", color: "blue" }}>
            View all payments
          </Link>
        ),
        icon: (
          <MoneyOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "receipt":
      data = {
        title: "RECEIPTS",
        isMoney: false,
        link: (
          <Link to="/receipts" style={{ textDecoration: "none", color: "blue" }}>
            View all receipts
          </Link>
        ),
        icon: (
          <ReceiptOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    
    default:
      return null;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₸ "} {loading ? "Loading..." : error ? "Error" : itemCount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          0%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
