import React from "react";
import noAvatar from "../../assets/jpg/no-avatar.png";
import { BiLogOut } from "react-icons/bi";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function SignInImage() {
  const data = JSON.parse(localStorage.getItem("userData"));
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logoutRef = useRef(null);
  const logoutDiv = useRef(null);
  

    useEffect(() => {
      function handleClickOutside(event) {
        if (logoutRef.current && !logoutRef.current.contains(event.target) && (logoutDiv.current) &&  !logoutDiv.current.contains(event.target)) {
          setShowLogout(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [logoutRef]);


  function logoutHandler() {
    auth.logout();
    navigate("/sign-in");
  }

  function logOutField() {
    return (
      <span className="logoutBlock" onClick={logoutHandler} ref={logoutDiv}>
        <p className="logoutTitle">Log out</p>
        <BiLogOut className="logoutImage" />
      </span>
    );
  }

  return (
    <div className="imageSignIn">
      {data?.image ? (
        <>
          <img
            className={`userImage ${showLogout ? "withLogout" : "noLogout"}`}
            onClick={() => setShowLogout(!showLogout)}
            src={`${data?.image}`}
            ref={logoutRef}
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
            ref={logoutRef}
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
