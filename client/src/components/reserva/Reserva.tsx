import {useEffect, useState} from 'react'
import { Box, Typography, TextField } from "@mui/material";
import { useGetPropertyByIdQuery, useGetUserByNameQuery, useCreateSignalMutation } from "../../reduxToolkit/apiSlice";
import { useParams } from "react-router-dom";
import UploadWidget3 from "./uploadWidget.tsx";
import { auth } from "../../firebase/firebase";

export const Signal = () => {
  const [user, setUser] = useState<string | null | undefined>(null);
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data, isLoading } = useGetPropertyByIdQuery(id);
  const { currentData } = useGetUserByNameQuery(user);
  const [createSignal] = useCreateSignalMutation()

  const formSignal= {
    operation: data?.operation,
    documentation: [],
    price: 5,
    propertyId: data?.id,
    brokerId: 1,
    userId: currentData?.[0]?.id,
  }

  console.log(formSignal)
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.displayName)
        setUser(user.displayName)
      } else {
        setUser(null)
      }
    });
    
    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Typography variant="h4">Cargando...</Typography>
      ) : (
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "Center",
            alignContent: "Center",
            p: 2,
            height: "80%",
            borderRadius: "10px",
          }}
        >
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="operation"
            label="Tipo de Operación"
            variant="outlined"
            name="operacion"
            value={data?.operation}
            fullWidth
            margin="normal"
            disabled
          />
          <UploadWidget3 />

          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="id"
            label="Identificación de la Propiedad"
            variant="outlined"
            name="id"
            value={data?.id}
            fullWidth
            margin="normal"
            disabled
          />
        </Box>
      )}
    </>
  );
};
