import { Box, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import { HomeMovil } from "../homeMovil/HomeMovil";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";
import { SearchBar } from "../searchBar/SearchBar";
import { Navbar } from "../navbar/Navbar";

const HomeContainer = () => {
  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScream: boolean = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      {/* <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
        <img
          src={logo}
          alt="PropTech logo"
          style={{
            width: isSmallScream ? "70%" : isMediumScream ? "20%" : "auto",
            backgroundColor: "green",
          }}
        />
        <SearchBar />
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
      </Box> */}
      <Navbar />
      {isMediumScream ? <HomeMovil /> : <HomeDesktop />}
    </Box>
  );
};

export default HomeContainer;
