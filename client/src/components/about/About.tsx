import logo from "../../image/logo.png";
import { Typography, Grid, Avatar, Container, IconButton, Box, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import s from "./About.module.css";
import { teamMembers } from "../../assets/imageTeam";
import prop from "../../image/Prop.png";
import mi from "../../image/Min.png";
import vi from "../../image/Vi.png";

export const About = () => {
  return (
    <Box>
      <img src={logo} alt="logo" width="250px" height="50px" />
      <section style={{ height: "90vh" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Box
              sx={{
                component: "grid",
                margin: "50px",
              }}
            >
              <div className={s.conteiner}>
                <section className={s.section}>
                  <div className={s.slide}>
                    <div className={s.img}>
                      <img src={mi} />
                    </div>
                    <div className={s.content}>
                      <h2>Misión</h2>
                      <div className={s.p}>
                        <p>
                          Nuestra plataforma propTech busca optimizar la experiencia de los clientes
                          y brokers en el mercado inmobiliario de Buenos Aires, mediante la
                          autoimatizació de tareas recurrentes, la agilización de la comunicación y
                          la resolución eficiente de operaciones.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={s.slide}>
                    <div className={s.img}>
                      <img src={vi} />
                    </div>
                    <div className={s.content}>
                      <h2>Visión</h2>
                      <p>
                        Nos esforzamos por consolidarnos como la plataforma líder en propiedades de
                        lujo en zonas exclusivas de Buenos Aires, gracias a nuestra atención al
                        cliente excepcional y nuestra capacidad de ofrecer soluciones personalizadas
                        y de calidad para brokers y clientes{" "}
                      </p>
                    </div>
                  </div>
                  <div className={s.slide}>
                    <div className={s.img}>
                      <img src={prop} />
                    </div>

                    <div className={s.content}>
                      <h2>Propósito</h2>
                      <p>
                        En nuestro propósito de ofrecer soluciuones eficientes y personalizadas,
                        creemos en la importancia de una comunicación transparente y eficaz entre
                        brokers y clientes. Por ello, nos enfocamos en generar confianza y
                        satisfacción en la plataforma a través de una atención al cliente
                        excepcional y una gestión óptima de las operaciones inmobiliarias
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </Box>
          </Grid>
        </Grid>
      </section>
      <section style={{ height: "90vh" }}>
        <Container>
          <Box my={8}>
            <Typography variant="h4" component="h1" align="center" fontWeight="600">
              Sobre Nosotros
            </Typography>
          </Box>
          <Grid
            container
            spacing={4}
            sx={{ ml: "25px", background: "#f2c6845d", borderRadius: "20px" }}
          >
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
                <Box sx={{ ml: 4, mb: 5 }}>
                  <IconButton component="a" href={member.path} target="_blank">
                    <GitHubIcon sx={{ color: "#171515" }} />
                  </IconButton>
                  <IconButton component="a" href={member.path2} target="_blank">
                    <LinkedInIcon sx={{ color: "#0e76a8" }} />
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
