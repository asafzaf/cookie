import React, { useState } from "react";

import LoginContent from "../../components/auth/loginContent";
import SignupContent from "../../components/auth/signupContent";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (isSignUp) {
    return <SignupContent setIsSignUp={setIsSignUp} />;
  } else {
    return <LoginContent setIsSignUp={setIsSignUp} />;
  }
};

export default AuthScreen;
