import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Grid, Typography, Button } from "@mui/material";

import { useGetUserByEmailQuery } from "../../reduxToolkit/apiSlice";

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  hashGoogle?: string | null;
}
export const UserProfile = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { data } = useGetUserByEmailQuery(user?.email || "");

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

  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{4,50}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <Grid container justifyContent="center" alignContent="center" sx={{ height: "100vh" }}>
      {user ? (
        <Grid
          container
          item
          xs={6}
          sx={{
            backgroundColor: "#ffe0b2",
            p: 2,
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Informacion personal
            </Typography>
            {data && (
              <>
                <Grid container justifyContent="space-around">
                  <Typography variant="h6">Nombre: {data.name}</Typography>
                  <Button> editar</Button>
                </Grid>
                <Grid container justifyContent="space-around"></Grid>
              </>
            )}
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};
