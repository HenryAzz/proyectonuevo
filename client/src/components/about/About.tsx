import logo from "../../image/logo.png";
import { Typography, Grid, Avatar, Container, IconButton, Box, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import { Carrousel } from "../carrousel/carrousel";
import { imageVision, imageProposito, imageMision } from "../../image/imagesPath";
import { teamMembers } from "../../assets/imageTeam";

export const About = () => {
  const images = [imageMision, imageVision, imageProposito];

  return (
    <Box>
      <img src={logo} alt="logo" width="250px" height="50px" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 12,
          p: 1,
          height: "79.5vh",
        }}
      >
        <Box sx={{ maxWidth: 1000, flexGrow: 2 }}>
          <Carrousel images={images} duration={15} />
        </Box>
      </Box>
      <section style={{ height: "100vh" }}>
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
          <Button sx={{ mt: 5, mb: 10 }} variant="contained" component="a" href="/home">
            Back Home
          </Button>
        </Box>
      </section>
    </Box>
  );
};
//
