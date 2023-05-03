import { Typography, TextField, Button, Stepper, Step, StepLabel, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const FormTasar = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();
  const nextStep = () => {
    if (activeStep < 3) setActiveStep((currentStep) => currentStep + 1);
  };
  const previousStep = () => {
    if (activeStep !== -1) setActiveStep((currentStep) => currentStep - 1);
  };

  function getSteps() {
    return ["Tipó de Propiedad", "Detalles de Propiedad"];
  }

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
          label="Type of Property"
          variant="outlined"
          placeholder="Enter Your Type of Real Estate Property"
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
          label="Type of Living Place"
          variant="outlined"
          placeholder="Enter Your Type of Living Place"
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
          label="Property Title"
          variant="outlined"
          placeholder="Enter Your Property Title Url"
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
            label="Address"
            variant="outlined"
            placeholder="Enter Your Address"
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
            label="Number"
            variant="outlined"
            placeholder="Enter Your Address' Number"
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
            label="Apartament"
            variant="outlined"
            placeholder="Enter Your Apartament's number and/or letter"
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
            label="Floor"
            variant="outlined"
            placeholder="Enter Your Apartament's Floor"
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
            label="Location"
            variant="outlined"
            placeholder="Enter The Location "
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
            label="Province"
            variant="outlined"
            placeholder="Enter The Province"
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
            label="Postal Code"
            variant="outlined"
            placeholder="Enter The Postal Code"
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
        return <TypeForm />;

      case 1:
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
          Thank You
        </Typography>
      ) : (
        <>
          {" "}
          <Button disabled={activeStep === 0} onClick={() => previousStep()}>
            Previous
          </Button>
          <Button onClick={() => nextStep()}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </>
      )}
      <br />
      <br />
      <br />
      <Link to="/firstFilters">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};
