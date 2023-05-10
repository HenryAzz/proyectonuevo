import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Link } from "react-router-dom";
import mano from "../../image/mano.png";
import styled from "@emotion/styled";
import UploadWidget from "./uploadWidget";
import UploadWidget2 from "./uploadWidget2";
import { useCreateFormMutation } from '../../reduxToolkit/apiSlice'
import {miArray} from './config'

export const Form = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();
  const nextStep = () => {
    if (activeStep < 3) setActiveStep((currentStep) => currentStep + 1);
  };
  const previousStep = () => {
    if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
  };

  function getSteps() {
    return ["Datos del Propietario", "Tipo de Propiedad", "Detalles de Propiedad"];
  }

  const property = [
    {
      value: "local",//shop
      label: "Local",
    },
    {
      value: "industria", //industry
      label: "Industria",
    },
    {
      value: "others",
      label: "Otros",
    },
  ];

  const operation = [
    {
      value: "tasar", //assess
      label: "Tasar",
    },
    {
      value: "Vender", //sell
      label: "Vender",
    },
    {
      value: "rentar", //rent
      label: "Alquilar",
    },
  ];

  const livingPlaces = [
    {
      value: "Casa",
      label: "Casa",
    },
    {
      value: "Departamento",
      label: "Departamento",
    },
    {
      value: "others",
      label: "Otros",
    },
  ];

  const Img = styled("img")({
    width: 50,
    height: 50,
  });

  const [operations, setOperations] = React.useState("");
  const [propertys, setProperty] = React.useState("");
  const [places, setlivingPlace] = React.useState("");

  //usar la ruta para crear el formulario
  const [createForm] = useCreateFormMutation()
  const [form, setForm] = React.useState({
    title: '',
    description: "deseo realizar la siguiente operacion:" + operations,
    picture_url: ["https://img.freepik.com/vector-gratis/hermosa-casa_24877-50819.jpg"],
    unit_price: 10,
    dni: "",
    tel: "",
    type_prop: '',
    type_vivienda: '',
    address: "",
    number: 0,
    apartment: "",
    floor: 0,
    location: "",
    province: "",
    postalCode: ""
  })

  const handleClick = () => {
    createForm(form)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm({...form, [e.target.name]: e.target.value as unknown})

  };

 console.log(miArray)
  
  const handleChange = (event: SelectChangeEvent) => {
    setOperations(event.target.value as string);
    setForm({...form, [event.target.name]: event.target.value as unknown})
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setProperty(event.target.value as string);
    setForm({...form, [event.target.name]: event.target.value as unknown})
  };
  const handleChange3 = (event: SelectChangeEvent) => {
    setlivingPlace(event.target.value as string);
    setForm({...form, [event.target.name]: event.target.value as unknown})
  };

  const DniForm = () => {

    return (
      <Container>
        <>
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
        </>
      </Container>
    );
  };

  const TypeForm = () => {
    return (
      <Container>
        <>
          <FormControl fullWidth sx={{ height: "auto" }}>
            <InputLabel id="operaciones">Tipo de Operación</InputLabel>
            <Select
              value={operations}
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
              value={propertys}
              onChange={handleChange2}
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
              value={places}
              onChange={handleChange3}
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
        </>
      </Container>
    );
  };

  const DetailsForm = () => {
    return (
      <Container>
        <>
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
        </>
      </Container>
    );
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <DniForm />;

      case 1:
        return <TypeForm />;
      case 2:
        return <DetailsForm />;

      default:
        return;
    }
  }

  return (
    <Container>
      <Link to="/home">
        <Img src={mano} alt="logo" />
      </Link>
      <Box
        sx={{
          mt: 5,
          backdropFilter: "blur(8px)",
          border: 2,
          solid: 1,
          borderRadius: 5,
          width: "120%",
          height: "auto",
        }}
      >
        <br />
        <div>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step) => {
              return (
                <Step>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <br />
          {getStepContent(activeStep)}
          {activeStep === steps.length ? (
            <Box>
              <Typography variant="h3" align="center" gutterBottom>
                ¡Muchas Gracias!
              </Typography>
              <Typography variant="h4" align="center" gutterBottom>
                Hemos recibido su solicitud exitosamente
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                Nos comunicaremos con usted a la brevedad
              </Typography>
            </Box>
          ) : (
            <>
              {" "}
              <br />
              <Button disabled={activeStep === 0} onClick={() => previousStep()}>
                Anterior
              </Button>
              <Button onClick={() => nextStep()}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>

              <Button onClick={handleClick}>
                enviar formulario
              </Button>
            </>
          )}
          <br />
          <br />
          <br />
          <Link to="/firstFilters">
            <Button>Volver al Inicio</Button>
          </Link>
        </div>
      </Box>
    </Container>
  );
};
//
