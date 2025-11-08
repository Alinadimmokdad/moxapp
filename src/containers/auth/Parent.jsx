import { Container, Paper, Box } from "@mui/material";
import { useState } from "react";
import ResetPasswordForm from "./ResetPassWord";
import CompleteResetPasswordForm from "./CompleteResetPassword";
import SignInForm from "./SignInForm";

export default function Parent() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToSignIn = () => {
    setShowForgotPassword(false);
    setShowResetPassword(false);
    setUserEmail("");
  };

  const handleSendOTP = (email) => {
    setUserEmail(email);
    setShowForgotPassword(false);
    setShowResetPassword(true);
    console.log("OTP sent to:", email);
    alert(`OTP sent to ${email}! (Check console)`);
  };

  const handleResendOTP = () => {
    console.log("Resending OTP to:", userEmail);
    alert(`OTP resent to ${userEmail}! (Check console)`);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {showResetPassword ? (
          <CompleteResetPasswordForm
            email={userEmail}
            onBackToSignIn={handleBackToSignIn}
            onResendOTP={handleResendOTP}
          />
        ) : showForgotPassword ? (
          <ResetPasswordForm
            onBackToSignIn={handleBackToSignIn}
            onSendOTP={handleSendOTP}
          />
        ) : (
          <SignInForm onForgotPassword={handleForgotPassword} />
        )}
      </Paper>
    </Container>
  );
}
