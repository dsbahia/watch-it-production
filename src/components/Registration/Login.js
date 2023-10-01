import { React, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthValue } from "./AuthContext";
import WatchItLogo from "../WatchItLogo";
import "../../styles/forms.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (!auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        setTimeActive(true);
        navigate("/verify-email");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("");
      if (err.code === "auth/invalid-login-credentials") {
        toast.error("Incorrect email or password. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <WatchItLogo />
        <h1>Log in</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <span>
          Don&apos;t have an account?
          <Link to="/register">Create one here</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
