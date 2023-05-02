import { Box, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
import { HomeMovil } from "../homeMovil/HomeMovil";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";

const HomeContainer = () => {
  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScream: boolean = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", m: 2 }}>
        <img
          src={logo}
          alt="PropTeach logo"
          style={{ width: isSmallScream ? "70%" : isMediumScream ? "65%" : "auto" }}
        />
        <Link to="/logIN" style={{ alignSelf: "center", textDecoration: "none", color: "#B17A50" }}>
          <Typography sx={{ display: "flex" }}>
            Log In <AccountCircleOutlinedIcon sx={{ alignSelf: "flex-end", ml: 1 }} />
          </Typography>
        </Link>
      </Box>
      {isMediumScream ? <HomeMovil /> : <HomeDesktop />}
    </Box>
  );
};

export default HomeContainer;
