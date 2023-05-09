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
            <Grid container justifyContent="center">
              <Grid container justifyContent="space-between" sx={{ width: "75vw" }}>
                <Grid
                  item
                  sx={{
                    alignSelf: { lg: "center" },
                    display: { xs: "none", md: "block" },
                    width: "10vw",
                    flexGrow: 0.5,
                  }}
                >
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
                      textDecoration: "none",
                      color: "#B17A50",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        display: { xs: "none", sm: "none", md: "block" },
                      }}
                    >
                      Iniciar Sesion
                    </Typography>
                    <AccountCircleOutlinedIcon
                      sx={{ alignSelf: "center", ml: 1, fontSize: { xs: 40, md: 25 } }}
                    />
                  </Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <SecondFilters />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
