import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Grid } from "@mui/material";
import { NavBar } from "../navbar/Navbar";

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
export const UserProfile = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <NavBar />
      <Grid container justifyContent="center" alignContent="center" sx={{ height: "100vh" }}>
        {user ? <Grid item>{user.email}</Grid> : null}
      </Grid>
    </>
  );
};
