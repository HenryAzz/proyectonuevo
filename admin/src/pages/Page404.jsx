import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
//Image
import Image from "../images/image404.png";
// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> Pagina no encontrada | PropTech </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Lo sentimos, pagina no encontrada.
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Lo sentimos, no pudimos encontrar la página que estás buscando. Quizás la direccion URL
            o el recurso no existe.
          </Typography>

          <Box
            component="img"
            src={Image}
            sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button to="/dashboard" size="large" variant="contained" component={RouterLink}>
            Volver
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
