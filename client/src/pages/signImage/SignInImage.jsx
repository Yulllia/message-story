import React from "react";
import noAvatar from "../../assets/jpg/no-avatar.png";
import { BiLogOut } from "react-icons/bi";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function SignInImage() {
  const data = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="imageSignIn">
      {data?.image.length > 0 ? (
        <>
          <img
            className={`userImage ${showLogout ? "withLogout" : "noLogout"}`}
            onClick={() => setShowLogout(!showLogout)}
            src={`${data?.image}`}
            alt="userpicture"
          />
          <div
            className="colored-circle"
            style={{ bottom: showLogout ? "54px" : "24px" }}
          >
            <div className="checkmark"></div>
          </div>
          {showLogout && logOutField()}
        </>
      ) : (
        <>
          <img
            className={`userImage ${showLogout ? "withLogout" : "noLogout"}`}
            src={`${noAvatar}`}
            onClick={() => setShowLogout(!showLogout)}
            alt="userpicture"
          />
          <div
            className="colored-circle"
            style={{ bottom: showLogout ? "54px" : "24px" }}
          >
            <div className="checkmark"></div>
          </div>
          {showLogout && logOutField()}
        </>
      )}
    </div>
  );
}

export default SignInImage;
