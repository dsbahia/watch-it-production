import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuthValue } from "./Registration/AuthContext";
import { auth } from "./Registration/firebase";
import userImage from "../images/UserImage.png";
import "../styles/profilepage.css";

function Profile() {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (error) {
      console.error("Sign out error", error);
    }
  };
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-title">Profile</div>
        <img className="profile-image" src={userImage} alt="profile" />
        <div className="profile-item">
          <strong>Email: </strong>
          {currentUser?.email}{" "}
        </div>
        <div>
          <strong>Email verified: </strong>
          {currentUser?.emailVerified ? (<FontAwesomeIcon icon={faCheck} />) : <FontAwesomeIcon icon={faSquareXmark} />}
        </div>
        <button className="profile-btn" type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
export default Profile;
