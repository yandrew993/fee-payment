import { useContext, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", { username, password });

      // Backend returns { message, user: {..., role}, token }
      const userData = res.data.user;
      
      // Allow both admins and accountants to log in
      if (userData && (userData.role === "admin" || userData.role === "accountant")) {
        updateUser(userData);
        navigate("/");
      } else {
        setError("Not Authorized! Only admins and accountants can access this panel.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          {/* <div className="credentials-info">
            <p><strong>Demo Admin Account:</strong></p>
            <p>Username: <code>admin</code></p>
            <p>Password: <code>Admin@123</code></p>
            <p style={{ marginTop: "10px" }}><strong>Demo Accountant Account:</strong></p>
            <p>Username: <code>accountant</code></p>
            <p>Password: <code>12345@25</code></p>
          </div> */}
        <a href="http://localhost:5173/login">Not a Guest?</a>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
