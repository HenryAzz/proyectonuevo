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
      <Grid
        item
        className={styles.contianerAbout}
        lg={9}
        md={9}
        sm={10}
        xs={10}
      >
        <Link to="#" className={styles.containerImage}>
          <Box component="img" src={image} className={styles.image} />
        </Link>
        <Typography variant={isSmallScream ? "body1" : "h4"} component="p">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt,
          quas. Mollitia voluptas itaque natus repellat suscipit, ipsa animi
          similique voluptatum harum optio, impedit, accusantium delectus
          quidem? Eos, odio? Doloribus, reprehenderit?
        </Typography>
      </Grid>
    </Grid>
  );
};
