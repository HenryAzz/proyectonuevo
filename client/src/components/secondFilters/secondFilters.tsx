import {
  Button,
  Stack,
  Menu,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState, useRef } from "react";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
};

export const SecondFilters: React.FC<filterPorps> = ({ setStringQuery, stringQuery }) => {
  const handlerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { id } = event.currentTarget;
    let newQuery = stringQuery.replace(/&type=[^&]*/g, "");
    newQuery += `&type=${id}`;

    setStringQuery(newQuery);
  };
  const properties: string[] = ["vivienda", "oficina", "local", "industria"];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setAnchorEl(ref.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /* const dataButton = (e: any) => {
    const typeOfProperty = e.currentTarget.id;

    typeOfProperty !== "zona"
      ? console.log(e.currentTarget.id)
      : console.log("No es un tipo de vivienda");
  }; */
  return (
    <div>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          mt: "2vw",
          width: "75vw",
        }}
      >
        <Button variant="contained" fullWidth id="zona" ref={ref} onClick={handleClick}>
          Zona
        </Button>
        {properties.map((element, index) => (
          <Button variant="contained" onClick={handlerClick} fullWidth id={element} key={index}>
            {element}
          </Button>
        ))}
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <FormControl>
            <FormControlLabel control={<Checkbox />} label="Zona 1" labelPlacement="start" />
            <FormControlLabel control={<Checkbox />} label="Zona 2" labelPlacement="start" />
            <FormControlLabel control={<Checkbox />} label="Zona 3" labelPlacement="start" />
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  );
};
