import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail, verifyPasswordResetCode } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
      // Reset email sent successfully, wait for user to reset password
    } catch (error) {
      setMessage("Failed to send password reset email. Please try again.");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const checkEmailReset = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const oobCode = queryParams.get("oobCode");

      if (oobCode) {
        try {
          await verifyPasswordResetCode(auth, oobCode);
          // Password reset code is valid, navigate to login page
          navigate("/login"); // Redirect to login page
        } catch (error) {
          // Invalid password reset code, show error message or handle accordingly
        }
      }
    };

    checkEmailReset();
  }, [navigate]);

  return (
    <div>
      <h1>Password Recovery</h1>
      <p>{message}</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};
