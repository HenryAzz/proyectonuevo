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

import { Typography, Grid, Avatar, Container, IconButton } from "@mui/material";
import azz from "../../assets/azz.jpeg";
import gustavo from "../../assets/gustavo.jpeg";
import argio from "../../assets/argio.jpeg";
import samuel from "../../assets/samuel.jpeg";
import zuli from "../../assets/zuli.jpeg";
import diego from "../../assets/diego.jpeg";
import santi from "../../assets/santi.jpeg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

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

  const teamMembers = [
    {
      name: "Carla Formento",
      role: "Front End Developer",
      image:
        "https://media.licdn.com/dms/image/D4D03AQHTAmDobs0Rmw/profile-displayphoto-shrink_800_800/0/1671311798297?e=1689206400&v=beta&t=5QArZH4ug0KtMdWyy6kzoDCU_7KxLDiiRnPGJ-tb9CM",
      path: "https://github.com/Carlunchi",
      path2: "https://www.linkedin.com/in/carla-formento/",
    },
    {
      name: "Azul Schiaffino",
      role: "Full Stack Developer",
      image: azz,
      path: "https://github.com/HenryAzz",
      path2: "https://www.linkedin.com",
    },
    {
      name: "Gustavo Guaimas",
      role: "Front End Developer",
      image: gustavo,
      path: "https://github.com/gguaimas85",
      path2: "https://www.linkedin.com",
    },
    {
      name: "Samuel Delgado",
      role: "Back End Developer",
      image: samuel,
      path: "https://github.com/kaylreese",
      path2: "https://www.linkedin.com/in/samuel-bocanegra-delgado-17a52a238/",
    },
    {
      name: "Argiro Arias",
      role: "Full Stack Developer",
      image: argio,
      path: "https://github.com/elto82",
      path2: "https://www.linkedin.com",
    },
    {
      name: "Zulimar Tovar",
      role: "Full Stack Developer",
      image: zuli,
      path: "https://github.com/tgzz14",
      path2: "https://www.linkedin.com/in/zulimar-tovar-garcía-3a223513a/",
    },
    {
      name: "Santiago Barajas",
      role: "Back End Developer",
      image: santi,
      path: "https://github.com/sachibarajas",
      path2: "https://www.linkedin.com",
    },
    {
      name: "Diego Piola",
      role: "Front End Developer",
      image: diego,
      path: "https://github.com/Diegohp141",
      path2: "https://www.linkedin.com",
    },
  ];

  return (
    <Box>
      <img src={logo} alt="logo" width="250px" height="50px" />
      <section style={{ height: "100vh" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 12, p: 1 }}>
          <Box sx={{ maxWidth: 1000, flexGrow: 2 }}>
            <AutoPlaySwipeableViews
              interval={8000}
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
                        height: 500,
                        maxWidth: 1000,
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
                  Siguiente
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
                  Anterior
                </Button>
              }
            />
          </Box>
        </Box>
      </section>
      <section style={{ height: "90vh" }}>
        <Container>
          <Box my={8}>
            <Typography variant="h4" component="h1" align="center" fontWeight="600">
              Sobre Nosotros
            </Typography>
          </Box>
          <Grid container spacing={4} sx={{ ml: "25px" }}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.name}>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: "120px", height: "120px", margin: "16px" }}
                />
                <Typography variant="h6" component="h2" color="black" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="subtitle2" color="black" fontWeight="bold" fontStyle="italic">
                  {member.role}
                </Typography>
                <Box sx={{ ml: 4 }}>
                  <IconButton>
                    <Link to={member.path}>
                      <GitHubIcon sx={{ color: "#171515" }} />
                    </Link>
                  </IconButton>

                  <IconButton>
                    <Link to={member.path2}>
                      <LinkedInIcon sx={{ color: "#0e76a8" }} />
                    </Link>
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box textAlign={"center"} mb={12}>
          <Button sx={{ mt: 5 }} variant="contained" component="a" href="/home">
            Back Home
          </Button>
        </Box>
      </section>
    </Box>
  );
};
//
