import { Container, Grid, Button } from "@mui/material";
import video from "../../image/video19.mp4";
import { Link } from "react-router-dom";
import s from "../landing/Landing.module.css";


export const Landing = () => {
  
  return (
    <Container>
      <br />
      <Grid container justifyContent="end" alignContent="end" position="fixed">
        <Link to="/home">
          <Button style={{ fontSize: 17 }} sx={{ color: "black" }} className={s.bt}>
            <span>
              <strong>INGRESAR</strong>
            </span>
          </Button>
        </Link>

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
          <div className={s.box}>
            <div className={s.box2}>
              CONTACTO:
              <br />
              Av. 9 de Julio 580
              <br />
              Whatsapp: 011-155895324 <br />
              PF.prop.tech@gmail.com <br />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
