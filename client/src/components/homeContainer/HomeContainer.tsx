import { Box, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

const HomeContainer = () => {
  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box>header</Box>
      {isSmallScream ? <Typography>Movil</Typography> : <Typography>Desc</Typography>}
    </Box>
  );
};

export default HomeContainer;
