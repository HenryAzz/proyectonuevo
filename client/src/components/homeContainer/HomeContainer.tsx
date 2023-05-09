import { Box, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { HomeMovil } from "../homeMovil/HomeMovil";
import { HomeDesktop } from "../homeDesktop/HomeDesktop";
import { Navbar } from "../navbar/Navbar";

const HomeContainer = () => {
  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScream: boolean = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Navbar />
      {isMediumScream ? <HomeMovil /> : <HomeDesktop />}
    </Box>
  );
};

export default HomeContainer;
