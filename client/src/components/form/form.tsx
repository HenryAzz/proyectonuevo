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
import mano from "../../image/mano.png";
import styled from "@emotion/styled";
import UploadWidget from "./uploadWidget";
import UploadWidget2 from "./uploadWidget2";
import { useCreateFormMutation } from "../../reduxToolkit/apiSlice";
import { auth } from "../../firebase/firebase";
import { orange } from "@mui/material/colors";
import { miArray } from "./config";
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

  //console.log(activeMP)
  console.log(form);
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

  const Img = styled("img")({
    width: 50,
    height: 50,
  });

  const handleClick = async () => {
    //enviar peticion post a la api, para crear formulario
    await createForm(form);

    //generar luego del envio de la info a la api la orden de pago de mercadopago
    const response = await axios.post(`http://localhost:3001/mercadopago`, form);

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
                Antes de llenar el formaulario debe iniciar sesión:
              </Typography>
              <Link to="/login" style={{ alignSelf: "center" }}>
                <button> Ir a iniciar sesión</button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Container>
          <Link to="/home">
            <Img src={mano} alt="logo" />
          </Link>
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
          <Button onClick={handleClick}>enviar formulario</Button>
          <div className="cho-container"></div>
        </Container>
      )}
    </>
  );
};

//CODIGO DE CARLI

// import {
//   Typography,
//   TextField,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   Box,
//   Container,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material/Select";
// import React from "react";
// import { Link } from "react-router-dom";
// import mano from "../../image/mano.png";
// import styled from "@emotion/styled";
// import UploadWidget from "./uploadWidget";
// import UploadWidget2 from "./uploadWidget2";
// import { useCreateFormMutation } from '../../reduxToolkit/apiSlice'
// //import {miArray} from './config'

// export const Form = () => {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const steps = getSteps();
//   const nextStep = () => {
//     if (activeStep < 3) setActiveStep((currentStep) => currentStep + 1);
//   };
//   const previousStep = () => {
//     if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
//   };

//   function getSteps() {
//     return ["Datos del Propietario", "Tipo de Propiedad", "Detalles de Propiedad"];
//   }

//   const property = [
//     {
//       value: "local",//shop
//       label: "Local",
//     },
//     {
//       value: "industria", //industry
//       label: "Industria",
//     },
//     {
//       value: "others",
//       label: "Otros",
//     },
//   ];

//   const operation = [
//     {
//       value: "tasar", //assess
//       label: "Tasar",
//     },
//     {
//       value: "Vender", //sell
//       label: "Vender",
//     },
//     {
//       value: "rentar", //rent
//       label: "Alquilar",
//     },
//   ];

//   const livingPlaces = [
//     {
//       value: "Casa",
//       label: "Casa",
//     },
//     {
//       value: "Departamento",
//       label: "Departamento",
//     },
//     {
//       value: "others",
//       label: "Otros",
//     },
//   ];

//   const Img = styled("img")({
//     width: 50,
//     height: 50,
//   });

//   //usar la ruta para crear el formulario
//   const [createForm] = useCreateFormMutation()
//   const [form, setForm] = React.useState({
//     title: '',
//     description: "deseo realizar la siguiente operacion:",
//     picture_url: ["https://img.freepik.com/vector-gratis/hermosa-casa_24877-50819.jpg"],
//     unit_price: 10,
//     dni: "",
//     tel: "",
//     type_prop: '',
//     type_vivienda: '',
//     address: "",
//     number: 0,
//     apartment: "",
//     floor: 0,
//     location: "",
//     province: "",
//     postalCode: ""
//   })

//   const handleClick = () => {
//     createForm(form)
//   }

//   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({...form, [e.target.name]: e.target.value})
//   };

//   const handleChange = (event: SelectChangeEvent) => {
//     setForm({...form, [event.target.name]: event.target.value})
//   };

//   console.log(form)
//   const DniForm = () => {

//     return (
//       <Container>
//         <>
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="dni-propietaio"
//               label="DNI del propietario"
//               variant="outlined"
//               placeholder="Ingrese su DNI"
//               name="dni"
//               value={form.dni}
//               onChange={handleChangeInput}
//               fullWidth
//               margin="normal"
//             />

//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="alternate-phone"
//               label="Teléfono"
//               variant="outlined"
//               placeholder="Ingrese su número de Teléfono"
//               fullWidth
//               name="tel"
//               value={form.tel}
//               onChange={handleChangeInput}
//               margin="normal"
//             />
//           </Box>

//           <UploadWidget2 />
//         </>
//       </Container>
//     );
//   };

//   const TypeForm = () => {
//     return (
//       <Container>
//         <>
//           <FormControl fullWidth sx={{ height: "auto" }}>
//             <InputLabel id="operaciones">Tipo de Operación</InputLabel>
//             <Select
//               value={form.title}
//               onChange={handleChange}
//               labelId="operaciones"
//               label=" Tipo de Operaciones"
//               name="title"
//               sx={{ bgcolor: "#ffecb3" }}
//             >
//               {operation.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <br />
//           <br />
//           <FormControl fullWidth sx={{ height: "auto" }}>
//             <InputLabel id="propiedad">Tipo de Propiedad</InputLabel>
//             <Select
//               value={form.type_prop}
//               onChange={handleChange}
//               labelId="propiedad"
//               name="type_prop"
//               label=" Tipo de Propiedad"
//               sx={{ bgcolor: "#ffecb3" }}
//             >
//               {property.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <br />
//           <br />

//           <FormControl fullWidth sx={{ height: "auto" }}>
//             <InputLabel id="vivienda">Tipo de Vivienda</InputLabel>
//             <Select
//               value={form.type_vivienda}
//               onChange={handleChange}
//               labelId="vivienda"
//               label=" Tipo de Vivienda"
//               name="type_vivienda"
//               sx={{ bgcolor: "#ffecb3" }}
//             >
//               {livingPlaces.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <br />
//           <br />

//           <UploadWidget />
//         </>
//       </Container>
//     );
//   };

//   const DetailsForm = () => {
//     return (
//       <Container>
//         <>
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="direccion"
//               label="Dirección"
//               variant="outlined"
//               placeholder="Dirección del inmueble"
//               fullWidth
//               name="address"
//               value={form.address}
//               onChange={handleChangeInput}
//               margin="normal"
//             />

//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="numero"
//               label="Número"
//               variant="outlined"
//               placeholder="Número de la dirección"
//               fullWidth
//               margin="normal"
//               value={form.number}
//               name="number"
//               onChange={handleChangeInput}
//             />
//           </Box>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="dpto"
//               label="Apartamento"
//               variant="outlined"
//               placeholder="Ingrese el número y/o letra del apartamento"
//               fullWidth
//               margin="normal"
//               name="apartment"
//               value={form.apartment}
//               onChange={handleChangeInput}
//             />

//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="piso"
//               label="Piso"
//               variant="outlined"
//               placeholder="Piso del Apartamento"
//               fullWidth
//               margin="normal"
//               name="floor"
//               value={form.floor}
//               onChange={handleChangeInput}
//             />
//           </Box>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="localidad"
//               label="Ubicación"
//               variant="outlined"
//               placeholder="Ingrese la ubicación "
//               fullWidth
//               margin="normal"
//               name="location"
//               value={form.location}
//               onChange={handleChangeInput}
//             />

//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="provincia"
//               label="Provincia"
//               variant="outlined"
//               placeholder="Ingrese la provincia"
//               fullWidth
//               margin="normal"
//               name="province"
//               value={form.province}
//               onChange={handleChangeInput}
//             />

//             <TextField
//               sx={{ bgcolor: "#ffecb3" }}
//               id="codigo-postal"
//               label="Código Postal"
//               variant="outlined"
//               placeholder="Ingrese el código postal"
//               fullWidth
//               margin="normal"
//               name="postalCode"
//               value={form.postalCode}
//               onChange={handleChangeInput}
//             />
//           </Box>
//         </>
//       </Container>
//     );
//   };

//   function getStepContent(step: number) {
//     switch (step) {
//       case 0:
//         return <DniForm />;

//       case 1:
//         return <TypeForm />;
//       case 2:
//         return <DetailsForm />;

//       default:
//         return;
//     }
//   }

//   return (
//     <Container>
//       <Link to="/home">
//         <Img src={mano} alt="logo" />
//       </Link>
//       <Box
//         sx={{
//           mt: 5,
//           backdropFilter: "blur(8px)",
//           border: 2,
//           solid: 1,
//           borderRadius: 5,
//           width: "120%",
//           height: "auto",
//         }}
//       >
//         <br />
//         <div>
//           <Stepper alternativeLabel activeStep={activeStep}>
//             {steps.map((step) => {
//               return (
//                 <Step>
//                   <StepLabel>{step}</StepLabel>
//                 </Step>
//               );
//             })}
//           </Stepper>
//           <br />
//           {getStepContent(activeStep)}
//           {activeStep === steps.length ? (
//             <Box>
//               <Typography variant="h3" align="center" gutterBottom>
//                 ¡Muchas Gracias!
//               </Typography>
//               <Typography variant="h4" align="center" gutterBottom>
//                 Hemos recibido su solicitud exitosamente
//               </Typography>
//               <Typography variant="h6" align="center" gutterBottom>
//                 Nos comunicaremos con usted a la brevedad
//               </Typography>
//             </Box>
//           ) : (
//             <>
//               {" "}
//               <br />
//               <Button disabled={activeStep === 0} onClick={() => previousStep()}>
//                 Anterior
//               </Button>
//               <Button onClick={() => nextStep()}>
//                 {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
//               </Button>

//               <Button onClick={handleClick}>
//                 enviar formulario
//               </Button>
//             </>
//           )}
//           <br />
//           <br />
//           <br />
//           <Link to="/firstFilters">
//             <Button>Volver al Inicio</Button>
//           </Link>
//         </div>
//       </Box>
//     </Container>
//   );
// };
