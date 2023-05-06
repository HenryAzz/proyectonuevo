import { Typography, TextField, Button, Stepper, Step, StepLabel, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const FormVenta = () => {
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

  const DniForm = () => {
    // const { control } = useFormContext();
    return (
      <>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="dni-propietaio"
            label="DNI del propietario"
            variant="outlined"
            placeholder="Ingrese su DNI"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )} */}
          {/* /> */}
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="alternate-phone"
            label="Teléfono"
            variant="outlined"
            placeholder="Ingrese su número de Teléfono"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="foto-frente"
            label="Imagen frontal del DNI"
            variant="outlined"
            placeholder="Cargar imagen frontal del DNI"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="foto-dorso"
            label="Imagen dorsal del DNI "
            variant="outlined"
            placeholder="Cargar imagen dorsal del DNI"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
        </Box>
      </>
    );
  };

  const TypeForm = () => {
    // const { control } = useFormContext();
    return (
      <>
        {/* <Controller
          control={control}
          name="numero"
          render={({ field }) => ( */}
        <TextField
          sx={{ bgcolor: "#ffecb3" }}
          id="tipo-propiedad"
          label="Tipo de Propiedad"
          variant="outlined"
          placeholder="Ingrese el tipo de su propiedad"
          fullWidth
          margin="normal"
          // {...field}
        />
        {/* )}
        /> */}
        {/* <Controller
          control={control}
          name="numero"
          render={({ field }) => ( */}
        <TextField
          sx={{ bgcolor: "#ffecb3" }}
          id="tipo-vivienda"
          label="Tipo de Vivienda"
          variant="outlined"
          placeholder="Ingrese su tipo de Vivienda"
          fullWidth
          margin="normal"
          // {...field}
        />
        {/* )}
        /> */}
        {/* <Controller
          control={control}
          name="numero"
          render={({ field }) => ( */}
        <TextField
          sx={{ bgcolor: "#ffecb3" }}
          id="titulo-propiedad"
          label="Título de propiedad"
          variant="outlined"
          placeholder="Cargar la Imagen del título de propiedad del inmueble"
          fullWidth
          margin="normal"
          // {...field}
        />
        {/* )}
        /> */}
      </>
    );
  };

  const DetailsForm = () => {
    // const { control } = useFormContext();
    return (
      <>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="direccion"
            label="Dirección"
            variant="outlined"
            placeholder="Dirección del inmueble"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="numero"
            label="Número"
            variant="outlined"
            placeholder="Número de la dirección"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="dpto"
            label="Apartamento"
            variant="outlined"
            placeholder="Ingrese el número y/o letra del apartamento"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="piso"
            label="Piso"
            variant="outlined"
            placeholder="Piso del Apartamento"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="localidad"
            label="Ubicación"
            variant="outlined"
            placeholder="Ingrese la ubicación "
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="provincia"
            label="Provincia"
            variant="outlined"
            placeholder="Ingrese la provincia"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
          {/* <Controller
            control={control}
            name="numero"
            render={({ field }) => ( */}
          <TextField
            sx={{ bgcolor: "#ffecb3" }}
            id="codigo-postal"
            label="Código Postal"
            variant="outlined"
            placeholder="Ingrese el código postal"
            fullWidth
            margin="normal"
            // {...field}
          />
          {/* )}
          /> */}
        </Box>
      </>
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
      {getStepContent(activeStep)}
      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          ¡Muchas Gracias!
        </Typography>
      ) : (
        <>
          {" "}
          <Button disabled={activeStep === 0} onClick={() => previousStep()}>
            Anterior
          </Button>
          <Button onClick={() => nextStep()}>
            {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
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
  );
};
//
