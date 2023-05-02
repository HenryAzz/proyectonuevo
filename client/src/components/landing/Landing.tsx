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

export const Landing = () => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const images = [
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/1312655702892693725407772846488618597107579197780520140810825592358895688817.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/92937198071661013648683065071405695233455936173481489454911836633735024630315.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/96850457410302072426811136895493145174848684561209987092473061453917727760927.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/63118042607957671440180227322797082309291028340189813925637674199137584570280.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/103626451613956123223283816963688937639323535540611991973733867979817871514070.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/80957192934939506381223204308215177596660395954429140620041715943006522848368.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/52190703540580755133635977674885027463181373643252312232482937740864182934804.jpg",
    },
    {
      imgPath:
        "https://static.tokkobroker.com/water_pics/72224517180845554217245967059077653031855673327511970043480705103094583637700.jpg",
    },
  ];

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
                Back
              </Button>
            }
          />
          <Box textAlign={"center"}>
            <Button sx={{ mt: 5 }} variant="contained" component="a" href="/firstFilters">
              Lets Go
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
