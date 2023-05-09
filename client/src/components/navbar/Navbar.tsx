import { Box, AppBar, Toolbar, Container, Grid, Typography } from "@mui/material";
import Logo from "../../image/logo.png";
import { SearchBar } from "../searchBar/SearchBar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { orange } from "@mui/material/colors";
import { SecondFilters } from "../secondFilters/secondFilters";

export const Navbar = () => {
  const colorf = orange[50];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: colorf }} position="fixed">
        <Toolbar sx={{ mt: 2, mb: 2 }}>
          <Container>
            <Grid container direction="row" justifyContent="center">
              <Grid item sx={{ alignSelf: "center" }}>
                <img src={Logo} alt="PropTech logo" height="40vh" />
              </Grid>
              <Grid item sx={{ width: "40vw" }}>
                <SearchBar />
              </Grid>
              <Grid item>
                <Link
                  to="/logIN"
                  style={{
                    alignSelf: "center",
                    backgroundColor: "black",
                    textDecoration: "none",
                    color: "#B17A50",
                  }}
                >
                  <Typography variant="h6" sx={{ display: "flex" }}>
                    Iniciar Sesion <AccountCircleOutlinedIcon sx={{ alignSelf: "center", ml: 1 }} />
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <SecondFilters />
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
