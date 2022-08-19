import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorObj, setErrorObj] = useState({});
  const dataHandler = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const errorHandler = () => {
    const errorObj = {};
    if (data.email === "") {
      errorObj.emailErr = "Email cannot be empty";
    } else if (
      !data.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errorObj.emailErr = "Email not Valid";
    }
    if (data.password === "") {
      errorObj.passErr = "Password cannot be empty";
    }
    return errorObj;
  };
  const loginHandler = async () => {
    setErrorObj(errorHandler());
    // Checking if Error Object is Empty
    if (Object.keys(errorObj).length === 0) {
      await axios
        .post("https://reqres.in/api/login", { ...data })
        .then(function (response) {
          if (response.data.token) {
            toast.success("Login Successfull");
            localStorage.setItem("token", response?.data?.token);
            if (localStorage.getItem("token")) {
              navigate("/");
            }
          }
        })
        .catch(function (error) {
          toast.error("Login failed");
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="pure-center w100">
          <img
            className="wInherit"
            src="https://media.istockphoto.com/photos/laptop-computer-desktop-pc-human-hand-office-soft-focus-picture-picture-id811268074?k=20&m=811268074&s=612x612&w=0&h=ZRbtDWXGPi_pZghzHzF4Bzd3DKY8yuzBlWBEwZkHBwQ="
          />
        </div>
        <div className="w100 hFull" style={{ background: "gainsboro" }}>
          <span
            style={{
              width: "60%",
              background: "beige",
              margin: "auto",
              height: "-webkit-fill-available",
            }}
            className="pure-center"
          >
            <span className="wInherit">
              <img
                className="wInherit mb-10 imageCenter bradius"
                src="https://media.istockphoto.com/photos/laptop-computer-desktop-pc-human-hand-office-soft-focus-picture-picture-id811268074?k=20&m=811268074&s=612x612&w=0&h=ZRbtDWXGPi_pZghzHzF4Bzd3DKY8yuzBlWBEwZkHBwQ="
              />
              <div className="flexStart mb-10">Email</div>
              <input
                type="text"
                placeholder="Enter your Email"
                className="w100 mb-10"
                name="email"
                onChange={(e) => dataHandler(e)}
              />
              <span className="errorText">{errorObj.emailErr}</span>
              <div className="flexStart mb-10">Password</div>
              <input
                name="password"
                placeholder="Enter your password"
                className="w100 mb-10"
                onChange={(e) => dataHandler(e)}
              />
              <span className="errorText">{errorObj.passErr}</span>
              <div className="flexBetween">
                <Link to="/sign-up">Sign Up</Link>
                <button onClick={loginHandler}>Sign In</button>
              </div>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
