import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import logo from "../../image/logo.png";
import Mision from "../../image/Mision.jpeg";
import Vision from "../../image/Vision.jpeg";
import Proposito from "../../image/Proposito.jpeg";

export const About = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const images = [{ imgPath: Mision }, { imgPath: Vision }, { imgPath: Proposito }];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box>
      <img src={logo} alt="logo" width="250px" height="50px" />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10, p: 1 }}>
        <Box sx={{ maxWidth: 600, flexGrow: 2 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 300,
                      maxWidth: 600,
                      overflow: "hidden",
                      width: "100%",
                      display: "flex",
                    }}
                    src={step.imgPath}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            sx={{ bgcolor: "rgba(255,152,0,0.44)" }}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                sx={{ color: "black" }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button
                sx={{ color: "black" }}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Volver
              </Button>
            }
          />
          <Box textAlign={"center"}>
            <Button sx={{ mt: 5 }} variant="outlined" component="a" href="/home">
              Back Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
//
