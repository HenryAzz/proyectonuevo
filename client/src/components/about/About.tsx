import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import image from "../../image/logo.png";
import { Link } from "react-router-dom";
import styles from "../about/About.module.css";

export const About = () => {
  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container spacing={2} className={styles.root}>
      <Grid item className={styles.contianerAbout} lg={9} md={9} sm={10} xs={10}>
        <Link to="#" className={styles.containerImage}>
          <Box component="img" src={image} className={styles.image} />
        </Link>
        <Typography variant={isSmallScream ? "body1" : "h4"} component="p">
          Nuestra plataforma propTech busca optimizar la experiencia de los clientes y brokers en el
          mercado inmobiliario de Buenos Aires, mediante la automatización de tareas recurrentes, la
          agilización de la comunicación y la resolución eficiente de operaciones. Misión. Nos
          esforzamos por consolidarnos como la plataforma líder en propiedades de lujo en zonas
          exclusivas de Buenos Aires, gracias a nuestra atención al cliente excepcional y nuestra
          capacidad de ofrecer soluciones personalizadas y de calidad para brokers y clientes. En
          nuestro propósito de ofrecer soluciones eficientes y personalizadas, creemos en la
          importancia de una comunicación transparente y eficaz entre brokers y clientes. Por ello,
          nos enfocamos en generar confianza y satisfacción en la plataforma a través de una
          atención al cliente excepcional y una gestión óptima de las operaciones inmobiliarias.
        </Typography>
      </Grid>
    </Grid>
  );
};
