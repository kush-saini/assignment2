import React from "react";
import Register from "./Register";
function ProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Register />;
  }
}

export default ProtectedRoute;
