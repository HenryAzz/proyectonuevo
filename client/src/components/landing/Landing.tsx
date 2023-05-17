import { Container, Grid, Box } from "@mui/material";
import video from "../../image/Diseño sin título_1.mp4";
import { Link } from "react-router-dom";
import s from "../landing/Landing.module.css";

export const Landing = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container>
        <Grid container>
          <Grid item xs={8} sm={8} md={6} lg={4}>
            <video
              id="video"
              autoPlay
              loop
              muted
              src={video}
              style={{
                position: "fixed",
                width: "100%",
                left: "50%",
                top: "50%",

                objectFit: "cover",
                transform: "translate(-50%, -50%)",
                zIndex: "-1",
              }}
            ></video>
            <br />
            <Box display="flex" justifyContent="center" alignContent="center" sx={{ ml: 80 }}>
              <Link to="/home">
                <strong>
                  <button className={s.bt}>INGRESAR</button>
                </strong>
              </Link>

              <Link to="/about">
                <strong>
                  <button className={s.bt}>NOSOTROS</button>
                </strong>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
