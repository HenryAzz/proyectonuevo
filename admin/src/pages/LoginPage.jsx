import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
// images
import Logo from "../images/logo.png";
// sections
import { LoginForm } from "../sections/auth/login";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#969685",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  width: { lg: "35vw", md: "50vw", sm: "60vw" },
  height: "80vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(10, 5),
  backgroundColor: "#EBF0F0",
  borderRadius: "0.35rem",
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | PropTech </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                width: { lg: "25vw", md: "25vw", sm: "35vw" },
                height: "15vh",
                mb: 5,
              }}
            >
              <img src={Logo} />
            </Box>
            <Typography variant="h4" gutterBottom>
              Bienvenido a PropTech
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
