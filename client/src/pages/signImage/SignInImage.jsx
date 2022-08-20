import React from "react";
import noAvatar from "../../assets/jpg/no-avatar.png";


function SignInImage() {
  const data = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="imageSignIn">
      {data?.image.length > 0 ? (
        <>
          <img className="userImage" src={`${data?.image}`} alt="userpicture" />
          <div className="colored-circle">
            <div className="checkmark"></div>
          </div>
        </>
      ) : (
        <>
          <img className="userImage" src={`${noAvatar}`} alt="userpicture" />
          <div className="colored-circle">
            <div className="checkmark"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignInImage;
