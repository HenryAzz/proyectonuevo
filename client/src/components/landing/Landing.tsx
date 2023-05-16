import { Button, Card, CardActions, CardMedia, Grid, Container } from "@mui/material";
import video from "../../assets/video.mp4";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";
//import { videoUrl } from "../../assets/imageTeam";

export const Landing = () => {
  return (
    <>
      <Container sx={{}}>
        {" "}
        <br />
        <img src={logo} alt="logo" width="250px" height="50px" />
        <Grid
          container
          sx={{
            direction: "column",
            alignItems: "center",
            justify: "center",
          }}
        >
          <Card>
            <CardMedia
              component="video"
              src={video}
              autoPlay
              muted
              loop
              controls
              title="imagen"
              style={{ height: "80vh", width: "auto" }}
            ></CardMedia>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/home">
                <Button variant="contained">Ingresar</Button>
              </Link>
              <Link to="/about">
                <Button variant="outlined">Sobre Nosotros</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </>
  );
};
