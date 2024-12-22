import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authenticated = true }) => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  
  useEffect(() => {
      console.log("AuthStatus: "+authStatus);
      // console.log("Autheticated: "+authenticated);
      // console.log("Logic op "+(authenticated && authStatus !== authenticated));
      
      
    // If route requires authentication and user is not authenticated
    if (authenticated && authStatus!== authenticated) {
      console.log("Not authenticated");
      navigate("/login");
    } 
    // If route is public and user is authenticated (e.g., visiting signup when logged in)
    else if (!authenticated && authStatus!==authenticated ) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authenticated, navigate]);

  return loader ? <div>Loading...</div> : <div>{children}</div>;
};

export default AuthLayout;
