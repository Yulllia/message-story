import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../../assets/svg/visibilityIcon.svg";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/UseHttpHook";
import FacebookLogin from "react-facebook-login";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { name, password } = formData;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await request(
      "/api/auth/login",
      "POST",
      JSON.stringify(formData)
    );
    auth.login(data?.token, data?.name);
    if (data?.token) {
      navigate("/");
    }
  };

  const responseFacebook = async (response) => {
    const data = await request(
      "/api/auth/login/facebook",
      "POST",
      JSON.stringify({
        accessToken: response.accessToken,
        userId: response.userID,
        image: response.image ?? response.picture?.data?.url,
      })
    );
    auth.login(data?.token, data?.name, data?.image);
    if (data?.idFacebook) {
      navigate("/");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Sign In Page</p>
      </header>
      <form onSubmit={onSubmit}>
        <div className="passwordInputBlock">
          <input
            className="emailInput"
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="passwordInput"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              className="showPassword"
              src={visibilityIcon}
              alt="show Password"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </div>
      </form>
      <FacebookLogin
        className="facebookLogin"
        appId="1207028653424445"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <Link to="/sign-up" className="registerLink">
        Sign Up
      </Link>
    </div>
  );
}

export default SignIn;
