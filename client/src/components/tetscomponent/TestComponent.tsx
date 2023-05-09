import { useEffect, useState } from "react";
import { Grid, Button, TextField, Typography } from "@mui/material";

//improt intreface
import { createUserRequest } from "../../reduxToolkit/authentication";

//import rtk query
import {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useGetPropertyByTypeQuery,
  useDeletPropertyByIDMutation,
} from "../../reduxToolkit/apiSlice";
import { useCreateUserMutation } from "../../reduxToolkit/apiSlice";

//import firebase methods
import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const TestComponent = () => {
  const [user, setUser] = useState<string | null | undefined>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const { data, isLoading } = useGetPropertyByIdQuery(1);

  console.log(data, isLoading);
  //RTQ query
  const [createProperty] = useCreatePropertyMutation();
  const [deleteProperty] = useDeletPropertyByIDMutation();

  const [crateUser] = useCreateUserMutation();

  //Local States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>(""); /* 
  const [user, setUser] = useState<string | null | undefined>(null);
  auth?.currentUser?.email ? setUser(auth?.currentUser?.email) : setUser(null); */

  const handlerCreate = () => {
    const newProperty = {
      type: "Vivienda",
      address: "Avenida siempre viva 742",
      spaces: 3,
      price: 100000,
      pictures: [
        "https://d1994bulhovht.cloudfront.net/856x440/listings/5103720d-fdd9-4447-a2a3-cd02815190bf/c483c5ec-71ca-406d-a95c-298e625ddc09.webp",
      ],
      floors: 1,
      covered_area: 100,
      bathroom: 2,
      bedroom: 3,
      furnished: true,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      situation: "Disponible",
      total_area: 100,
      antiquity: 10,
      operation: "Venta",
      owner: "Dalmasca",
    };
    createProperty(newProperty);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user !== null) {
        const newUser: createUserRequest = {
          name: user.displayName || "",
          avatar: user.photoURL || "",
          email: user.email || "",
          hashGoogle: user.uid || "",
          person_type: "Persona Fisica",
          rol: "Cliente",
        };
        console.log(newUser);

        crateUser(newUser);
      }
    } catch (error: any) {
      console.log("Error signing in with Google:", error.message);
    }
  };

  const handlerDelete = () => {
    deleteProperty(3);
  };

  const handlerEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handlerPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const singIN = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerLogOuT = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{ display: "flex", flexDirection: "column", p: 1, backgroundColor: "pink" }}
      >
        {user ? <Typography sx={{ p: 1, mb: 1 }}>{user}</Typography> : null}
        <TextField
          value={email}
          variant="outlined"
          label="Usuario"
          sx={{ mb: 1 }}
          onChange={handlerEmail}
        ></TextField>
        <TextField
          value={password}
          variant="outlined"
          label="contraseña"
          type="password"
          sx={{ mb: 1 }}
          onChange={handlerPassword}
        ></TextField>
        <Button variant="contained" onClick={handlerDelete} sx={{ mb: 1 }}>
          Crear inmueble
        </Button>
        <Button variant="contained" onClick={singIN} sx={{ mb: 1 }}>
          Iniciar sesion
        </Button>
        <Button variant="contained" onClick={handleGoogleSignIn} sx={{ mb: 1 }}>
          conectar con google
        </Button>
        <Button variant="contained" onClick={handlerLogOuT} sx={{ mb: 1 }}>
          logOut
        </Button>
      </Grid>
    </Grid>
  );
};
