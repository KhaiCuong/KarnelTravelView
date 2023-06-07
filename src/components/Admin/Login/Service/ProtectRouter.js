import React from "react";
import { Navigate } from "react-router-dom";


function ProtectRouter({ children }) {
  const token = localStorage.getItem("token");
  const usertoken = localStorage.getItem("userToken");

  if (token) {
    if(JSON.parse(usertoken).role === "Admin" ){
      return children;
     }
     else{
      return <Navigate to="/" />;
     }
 
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectRouter;
