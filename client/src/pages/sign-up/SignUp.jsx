import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../../assets/svg/visibilityIcon.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

function SignUp() {
  const [showpPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const auth = useContext(AuthContext);
  const { name, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchSignUp = async () => {
        const rawResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const content = await rawResponse.json();
        if (!rawResponse.ok) {
          toast.error(content.message);
        } else {
          auth.login(content?.token, content?.name, content?.links);
          navigate("/");
          toast.success("User created!");
        }
      };
      fetchSignUp();
    } catch (error) {
      console.error(error, "Something wrong with registration");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Sign Up Page</p>
      </header>
      <form onSubmit={onSubmit}>
        <div className="passwordInputBlock">
          <input
            className="nameInput"
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showpPassword ? "text" : "password"}
              placeholder="Password"
              className="passwordInputSignUp"
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </div>
      </form>

      <Link to="/sign-in" className="registerLink">
        Sign In
      </Link>
    </div>
  );
}

export default SignUp;
