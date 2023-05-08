import { Box, AppBar, Toolbar, Container, Grid, Typography } from "@mui/material";
import Logo from "../../image/logo.png";
import { SearchBar } from "../searchBar/SearchBar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ bgcolor: "#ffe0b2" }}>
          <Container>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                <img src={Logo} alt="PropTech logo" height="40vh" />
              </Grid>
              <Grid item sx={{ width: "35vw", margin: "2vw", backgroundColor: "#F7F4F1" }}>
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
                  <Typography sx={{ display: "flex" }}>
                    Log In <AccountCircleOutlinedIcon sx={{ alignSelf: "flex-end", ml: 1 }} />
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
