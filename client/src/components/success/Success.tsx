import { useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import queryString from "query-string"; //info por query
import axios from "axios";

export const Success = () => {
  const queryParams = queryString.parse(window.location.search);
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        await axios.post(import.meta.env.VITE_URL_PAYMENT_MP, queryParams);
      } catch (error) {}
    };

    fetchPayment();
  }, [queryParams]);

  return (
    <>
      <Grid
        container
        sx={{
          height: "100vh",
          flexDirection: "column",
          justifyContent: "Center",
          alignContent: "Center",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: orange[50],
            p: 2,
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "Center",
              alignContent: "Center",
              p: 2,
              height: "80%",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h5">
              Tu pago fue registrado exitosamente!, corroborar en tu perfil
            </Typography>
            <Link to="/userProfile" style={{ alignSelf: "center" }}>
              <Button style={{ backgroundColor: "rgba(136, 85, 44, 0.85)", color: "white" }}>
                {" "}
                ir a perfil
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
