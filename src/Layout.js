import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Layout(props) {
  const navigate = useNavigate();
  const logoutHandler = () => {
    console.log("Logout clicked");
    localStorage.clear();
    toast.success("Logout Successfull");
    if (!localStorage.getItem("token")) {
      navigate("/sign-in");
    }
  };
  return (
    <div>
      <div className="navbar">
        <div
          className="onetwo"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            className="one"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "20%",
            }}
          >
            <span className="wInherit">
              <img
                className="w100"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1024px-Android_O_Preview_Logo.png"
              />
            </span>
            <span>Test Project</span>
          </div>

          <span className="two">
            <button className="logout" onClick={logoutHandler}>
              Logout
            </button>
          </span>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="sidebar">
          <div className="pure-center h50">
            <Link to="/users">Users</Link>
          </div>
        </div>
        <div className="right-section">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
