import { Box, AppBar, Toolbar, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Logo from "../../image/logo.png";
import { SearchBar } from "../searchBar/SearchBar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { orange } from "@mui/material/colors";
import { SecondFilters } from "../secondFilters/secondFilters";
import { Theme, useTheme } from "@mui/material/styles";
import Logo2 from "../../image/iconLogo.png";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
};

export const Navbar: React.FC<filterPorps> = ({ setStringQuery, stringQuery }) => {
  const colorf = orange[50];
  const theme: Theme = useTheme();
  const isMediumScream: boolean = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar sx={{ bgcolor: colorf }} position="fixed">
        <Toolbar sx={{ mt: 2, mb: 2 }}>
          <Container>
            <Grid container direction="row" justifyContent="center">
              <Grid item sx={{ alignSelf: "center" }}>
                <img src={isMediumScream ? Logo2 : Logo} alt="PropTech logo" height="40vh" />
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
                    {isMediumScream ? "" : "Iniciar Sesion"}
                    <AccountCircleOutlinedIcon sx={{ alignSelf: "center", ml: 1 }} />
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <SecondFilters setStringQuery={setStringQuery} stringQuery={stringQuery} />
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
