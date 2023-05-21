import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Container, Grid } from "@mui/material";
import {
  useGetPropertyByIdQuery,
  useGetUserByNameQuery,
  useCreateSignalMutation,
} from "../../reduxToolkit/apiSlice";
import { useParams, Link } from "react-router-dom";
import UploadWidget3 from "./uploadWidget.tsx";
import { auth } from "../../firebase/firebase";
import axios from "axios";
import mano from "../../image/mano.png";
import { orange } from "@mui/material/colors";
import { valueCloud } from './config.ts'
import Swal from "sweetalert2";
import * as Yup from 'yup';

declare const window: any;

interface intFormSignal {
  operation: string | undefined;
  documentation: string[];
  price: number;
  propertyId: number | undefined;
  brokerId: number;
  userId: number | undefined;
}

export const Signal = () => {
  const [user, setUser] = useState<string | null | undefined>(null);
  const { id } = useParams<{ id: string }>() as { id: string };
  const { data } = useGetPropertyByIdQuery(id);
  const { currentData } = useGetUserByNameQuery(user);
  const [createSignal] = useCreateSignalMutation();

  const formSignal: intFormSignal = {
    operation: data?.operation,
    documentation: valueCloud,
    price: 5,
    propertyId: data?.id,
    brokerId: 712913,
    userId: currentData?.[0]?.id,
  };

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log(user.displayName)
        setUser(user.displayName);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  
  const schema = Yup.object().shape({
    operation: Yup.string().required('dato prellenado, de tipo de operacion'),
    documentation: Yup.array().min(1, 'se requiere comprobante de ingreso.'),
    propertyId: Yup.number().required('dato prellenado, identificación de la propiedad.'),
    userId: Yup.number().required('dato prellenado, identificacion de usuario'),
  });

  const handleClick = async () => {
   try {
        //enviar peticion post a la api, para crear formulario
        await schema.validate(formSignal, { abortEarly: false });
    await createSignal(formSignal);

    Swal.fire({
      title: 'Exitoso!',
      text: 'Formulario llenado correctamente, proceder al realizar el pago',
    })


    const response = await axios.post(import.meta.env.VITE_URL_MERCADOPAGO_SIGNAL, formSignal);

    const data = response.data;
    if (data.global) {
      
      if (data.global && window.MercadoPago) {
        const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_TOKEN_CLIENT, {
          locale: "es-AR",
        });

        mp.checkout({
          preference: {
            id: data.global,
          },
          render: {
            container: ".cho-container",
            label: "Pagar",
          },
        });
      } else {
        console.error("MercadoPago no está disponible");
      }
    }
    
   } catch (errors: any) {
    const validationErrors: Record<string, string> = {};
      errors.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });

      const errorMessages = Object.values(validationErrors).join(', ');
  
      Swal.fire({
        icon: 'error',
        title: 'Corregir los siguientes errores:',
        text: errorMessages,
        footer: 'completar de manera correcta el formulario'
      })
    }
    
   }
  

  return (
    <>
      {!user ? (
        <Grid
          container
          sx={{
            height: "100vh",
            flexDirection: "column",
            justifyContent: "Center",
            alignContent: "Center",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: orange[50],
              p: 2,
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Box sx={{ width: "100%", mb: 2 }}>
              <Link to="/home">
                <img src={mano} alt="logo" style={{ width: "65px" }} />
              </Link>
            </Box>
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
              <Typography variant="h5">
                Antes de realizar la reserva debe iniciar sesión:
              </Typography>
              <Link to="/login" style={{ alignSelf: "center" }}>
                <button> Ir a iniciar sesión</button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      )  : (
        <Container>
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
          <Button onClick={handleClick}> Hacer reserva!</Button>
          <div className="cho-container"></div>
        </Container>
      )}
    </>
  );
};
