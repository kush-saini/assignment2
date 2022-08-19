import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
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
  const signUpHandler = async () => {
    setErrorObj(errorHandler());
    // Checking if Error Object is Empty
    if (Object.keys(errorObj).length === 0) {
      await axios
        .post("https://reqres.in/api/register", { ...data })
        .then(function (response) {
          toast.success("Sign Up Successfull");
          if (response.data.token) {
            navigate("/sign-in");
          }
        })
        .catch(function (error) {
          toast.error("Registration Failed");
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
            src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
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
                src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
              />
              <div className="flexStart mb-10">Email</div>
              <input
                name="email"
                onChange={(e) => dataHandler(e)}
                placeholder="Enter your Email"
                className="w100 mb-10"
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
                <Link to="/sign-in">Sign In</Link>
                <button onClick={signUpHandler}>Sign Up</button>
              </div>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
