import {
  TextField,
  Button,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Link } from "react-router-dom";
import UploadWidget from "./uploadWidget";
import UploadWidget2 from "./uploadWidget2";
import { useCreateFormMutation } from "../../reduxToolkit/apiSlice";
import { auth } from "../../firebase/firebase";
import { orange } from "@mui/material/colors";
import * as Yup from "yup";
import { miArray } from "./config";
import { NavBar } from "../navbar/Navbar";
import Swal from "sweetalert2";
import axios from "axios";

declare const window: any;

interface FormState {
  title: string;
  description: string;
  picture_url: string[];
  unit_price: number;
  dni: number;
  tel: number;
  type_prop: string;
  type_vivienda: string;
  address: string;
  number: number;
  apartment: string;
  floor: number;
  location: string;
  province: string;
  postalCode: string;
  email: string | null | undefined;
}

export const Form = () => {
  const [user, setUser] = React.useState<string | null | undefined>(null);
  console.log("user operaciones",user)
  //usar la ruta para crear el formulario
  const [createForm] = useCreateFormMutation();
  const [form, setForm] = React.useState<FormState>({
    title: "",
    description: "operaciones",
    picture_url: miArray,
    unit_price: 10,
    dni: 0,
    tel: 0,
    type_prop: "",
    type_vivienda: "",
    address: "",
    number: 0,
    apartment: "",
    floor: 0,
    location: "",
    province: "",
    postalCode: "",
    email: null,
  });

  const schema = Yup.object().shape({
    dni: Yup.string()
      .matches(/^\d{6,}$/, "Debe tener al menos 6 dígitos el dni")
      .transform((value, originalValue) => {
        // Convierte el número a cadena de texto antes de la validación
        if (typeof originalValue === "number") {
          return originalValue.toString();
        }
        return value;
      }),
    tel: Yup.string()
      .matches(/^\d{10,}$/, "Debe tener al menos 10 dígitos el numero telefonico")
      .transform((value, originalValue) => {
        // Convierte el número a cadena de texto antes de la validación
        if (typeof originalValue === "number") {
          return originalValue.toString();
        }
        return value;
      }),
    title: Yup.string().required("Seleccione un tipo de operación"),
    type_prop: Yup.string().required("Seleccione un tipo de propiedad"),
    type_vivienda: Yup.string().required("Seleccione un tipo de vivienda"),
    picture_url: Yup.array()
      .min(3, "se requieren min 3 archivos.")
      .required("se requieren las imagenes solicitadas."),
    address: Yup.string().required("La dirección es requerida"),
    number: Yup.number().required("El número de la dirección es requerido"),
    apartment: Yup.string().required("El apartamento es requerido"),
    floor: Yup.number().required("El número de piso es requerido"),
    location: Yup.string().required("La ubicación es requerida"),
    province: Yup.string().required("La provincia es requerida"),
    postalCode: Yup.string().required("El código postal es requerido"),
  });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
        setForm({ ...form, email: user.email });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const property = [
    {
      value: "local", //shop
      label: "Local",
    },
    {
      value: "industria", //industry
      label: "Industria",
    },
    {
      value: "vivienda",
      label: "Vivienda",
    },
    {
      value: "oficina",
      label: "Oficina",
    },
  ];

  const operation = [
    {
      value: "tasar", //assess
      label: "Tasar",
    },
    {
      value: "vender", //sell
      label: "Vender",
    },
    {
      value: "rentar", //rent
      label: "Alquilar",
    },
  ];

  const livingPlaces = [
    {
      value: "casa",
      label: "Casa",
    },
    {
      value: "departamento",
      label: "Departamento",
    },
    {
      value: "ph",
      label: "Ph",
    },
    {
      value: "edificio",
      label: "Edificio",
    },
    {
      value: "local",
      label: "Local",
    },
    {
      value: "industria",
      label: "Industria",
    },
    {
      value: "oficina",
      label: "Oficina",
    },
    {
      value: "loft",
      label: "Loft",
    },
    {
      value: "terreno",
      label: "Terreno",
    },
  ];

  const handleClick = async () => {
    try {
      //enviar peticion post a la api, para crear formulario
      await schema.validate(form, { abortEarly: false });
      await createForm(form);

      Swal.fire({
        title: "Exitoso!",
        text: "Formulario llenado correctamente, proceder al realizar el pago",
      });

      //generar luego del envio de la info a la api la orden de pago de mercadopago
      const response = await axios.post(import.meta.env.VITE_URL_MERCADOPAGO, form);

      const data = response.data;
      if (data.global) {
        if (window.MercadoPago) {
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

      const errorMessages = Object.values(validationErrors).join(", ");

      Swal.fire({
        icon: "error",
        title: "Corregir los siguientes errores:",
        text: errorMessages,
        footer: "completar de manera correcta el formulario",
      });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "floor" ||
      e.target.name === "tel" ||
      e.target.name === "number" ||
      e.target.name === "dni"
    ) {
      setForm({ ...form, [e.target.name]: Number(e.target.value) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <NavBar />
      {user ? (
        <Container>
          <Link to="/home"></Link>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="dni-propietaio"
              label="DNI del propietario"
              variant="outlined"
              placeholder="Ingrese su DNI"
              name="dni"
              value={form.dni}
              onChange={handleChangeInput}
              fullWidth
              margin="normal"
            />

            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="alternate-phone"
              label="Teléfono"
              variant="outlined"
              placeholder="Ingrese su número de Teléfono"
              fullWidth
              name="tel"
              value={form.tel}
              onChange={handleChangeInput}
              margin="normal"
            />
          </Box>

          <UploadWidget2 />

          <br />
          <br />

          <FormControl fullWidth sx={{ height: "auto" }}>
            <InputLabel id="operaciones">Tipo de Operación</InputLabel>
            <Select
              value={form.title}
              onChange={handleChange}
              labelId="operaciones"
              label=" Tipo de Operaciones"
              name="title"
              sx={{ bgcolor: "#ffecb3" }}
            >
              {operation.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />
          <br />
          <FormControl fullWidth sx={{ height: "auto" }}>
            <InputLabel id="propiedad">Tipo de Propiedad</InputLabel>
            <Select
              value={form.type_prop}
              onChange={handleChange}
              labelId="propiedad"
              name="type_prop"
              label=" Tipo de Propiedad"
              sx={{ bgcolor: "#ffecb3" }}
            >
              {property.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />
          <br />

          <FormControl fullWidth sx={{ height: "auto" }}>
            <InputLabel id="vivienda">Tipo de Vivienda</InputLabel>
            <Select
              value={form.type_vivienda}
              onChange={handleChange}
              labelId="vivienda"
              label=" Tipo de Vivienda"
              name="type_vivienda"
              sx={{ bgcolor: "#ffecb3" }}
            >
              {livingPlaces.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />
          <br />

          <UploadWidget />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="direccion"
              label="Dirección"
              variant="outlined"
              placeholder="Dirección del inmueble"
              fullWidth
              name="address"
              value={form.address}
              onChange={handleChangeInput}
              margin="normal"
            />

            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="numero"
              label="Número"
              variant="outlined"
              placeholder="Número de la dirección"
              fullWidth
              margin="normal"
              value={form.number}
              name="number"
              onChange={handleChangeInput}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="dpto"
              label="Apartamento"
              variant="outlined"
              placeholder="Ingrese el número y/o letra del apartamento"
              fullWidth
              margin="normal"
              name="apartment"
              value={form.apartment}
              onChange={handleChangeInput}
            />

            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="piso"
              label="Piso"
              variant="outlined"
              placeholder="Piso del Apartamento"
              fullWidth
              margin="normal"
              name="floor"
              value={form.floor}
              onChange={handleChangeInput}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="localidad"
              label="Ubicación"
              variant="outlined"
              placeholder="Ingrese la ubicación "
              fullWidth
              margin="normal"
              name="location"
              value={form.location}
              onChange={handleChangeInput}
            />

            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="provincia"
              label="Provincia"
              variant="outlined"
              placeholder="Ingrese la provincia"
              fullWidth
              margin="normal"
              name="province"
              value={form.province}
              onChange={handleChangeInput}
            />

            <TextField
              sx={{ bgcolor: "#ffecb3" }}
              id="codigo-postal"
              label="Código Postal"
              variant="outlined"
              placeholder="Ingrese el código postal"
              fullWidth
              margin="normal"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChangeInput}
            />
          </Box>
          <Button onClick={handleClick} style={{backgroundColor:"rgba(136, 85, 44, 0.85)", color:"white"}}>enviar formulario</Button>
          <br />
          <br />
          <div className="cho-container"></div>
        </Container>
      ) : (
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
                Antes de llenar el formaulario debe iniciar sesión:
              </Typography>
              <Link to="/login" style={{ alignSelf: "center" }}>
              <Button style={{backgroundColor:"rgba(136, 85, 44, 0.85)", color:"white"}}> Iniciar sesión</Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};
