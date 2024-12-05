import React, { useState } from "react";

import LoginContent from "../../components/auth/loginContent";
import SignupContent from "../../components/auth/signupContent";
import ResetPasswordContent from "../../components/auth/resetPasswordContent";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  if (isResetPassword) {
    return <ResetPasswordContent setIsResetPassword={setIsResetPassword} />;
  } else if (isSignUp) {
    return <SignupContent setIsSignUp={setIsSignUp} />;
  } else {
    return (
      <LoginContent
        setIsSignUp={setIsSignUp}
        setIsResetPassword={setIsResetPassword}
      />
    );
  }
};

export default AuthScreen;
