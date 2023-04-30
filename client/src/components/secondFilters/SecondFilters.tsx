import { useState, useRef } from "react";
import {
  Button,
  Box,
  ButtonGroup,
  Menu,
  MenuItem,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";

export const SecondFilters = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(ref.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <ButtonGroup>
        <Button variant="contained" ref={ref} onClick={handleClick}>
          Zona
        </Button>
        <Button variant="contained">Vivienda</Button>
        <Button variant="contained">Oficina</Button>
        <Button variant="contained">Local</Button>
        <Button variant="contained">Industria</Button>
      </ButtonGroup>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <FormControl>
            <FormControlLabel control={<Checkbox />} label="Zona 1" labelPlacement="start" />
            <FormControlLabel control={<Checkbox />} label="Zona 2" labelPlacement="start" />
            <FormControlLabel control={<Checkbox />} label="Zona 3" labelPlacement="start" />
          </FormControl>
        </MenuItem>
      </Menu>
    </Box>
  );
};
