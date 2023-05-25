import { Box, Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { imageLogo } from "../../image/imagesPath";

export const Dashboard = () => {
  return (
    <Box>
      <Box sx={{ width: 380, bgcolor: "red" }}>
        <Grid item sx={{ alignSelf: "center", width: "100%" }}>
          <img src={imageLogo} alt="PropTech logo" height="40vh" />
        </Grid>
        <Paper sx={{ width: "100%" }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <EqualizerIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <PersonSearchIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Usuarios</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <HomeWorkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Propiedades</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
    </Box>
  );
};
