import React from "react";
import noAvatar from "../../assets/jpg/no-avatar.png";
import { BiLogOut } from "react-icons/bi";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function SignInImage() {
  const data = JSON.parse(localStorage.getItem("userData"));
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  
  function logoutHandler(e) {
    e.preventDefault();
    setShowLogout(!showLogout);
    auth.logout();
    navigate("/sign-in");
  }
  
 function logOutField() {
    return (
      <span className="logoutBlock">
        <p className="logoutTitle">Log out</p>
        <BiLogOut className="logoutImage" />
      </span>
    );
  }
  
  return (
    <div className="imageSignIn">
      {data?.image.length > 0 ? (
        <>
          <img className={`userImage ${showLogout ? "withLogout" : "noLogout"}`} src={`${data?.image}`} alt="userpicture" onClick={logoutHandler}/>
          <div className="colored-circle" style={{ bottom: showLogout ? "54px" : "24px" }}>
            <div className="checkmark"></div>
          </div>
          {showLogout && logOutField()}
        </>
      ) : (
        <>
          <img className={`userImage ${showLogout ? "withLogout" : "noLogout"}`} src={`${data?.image}`} alt="userpicture" onClick={logoutHandler}/>
          <div className="colored-circle" style={{ bottom: showLogout ? "54px" : "24px" }}>
            <div className="checkmark"></div>
          </div>
          {showLogout && logOutField()}
        </>
      )}
    </div>
  );
}

export default SignInImage;
