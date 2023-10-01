import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase";
import { useAuthValue } from "./AuthContext";
import "../../styles/verifyEmail.css";

function VerifyEmail() {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (currentUser) {
        try {
          await currentUser.reload();
          if (currentUser.emailVerified) {
            clearInterval(interval);
            navigate("/");
          }
        } catch (err) {
          toast.error("An error occurred. Please try again later.");
        }
      }
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let timeInterval = null;
    if (timeActive && time !== 0) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(timeInterval);
    }
    return () => clearInterval(timeInterval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setTimeActive(true);
      } catch (err) {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-contents">
        <h1>Verify your Email Address</h1>
        <p>
          A Verification email has been sent to:{" "}
          <strong>{currentUser && currentUser.email}</strong>
        </p>
        <p>Follow the instructions in the email to verify your account.</p>
        <button
          onClick={resendEmailVerification}
          type="button"
          disabled={timeActive}
        >
          Resend Email {timeActive && `(${time})`}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
