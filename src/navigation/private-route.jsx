import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const auth = useSelector((data) => data.userDataSlice.userData);
  const navigate = useNavigate();
  if (auth) {
    return <>{props.children}</>;
  } else {
    navigate("/dashboard", { replace: true });
    return null;
  }
};

export default PrivateRoute;
