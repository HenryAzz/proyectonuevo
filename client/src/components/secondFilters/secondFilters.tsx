/* import { Grid } from "@mui/material";
import { useGetPropertysFilterQuery } from "../../reduxToolkit/apiSlice";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
};

export const SecondFilters: React.FC<filterPorps> = ({ setStringQuery, stringQuery }) => {
  const { data, isLoading } = useGetPropertysFilterQuery(stringQuery);

  console.log(data, isLoading, setStringQuery);
  return <Grid></Grid>;
};
 */

import { useState } from "react";
import {
  Grid,
  Button,
  Drawer,
  CircularProgress,
  Typography,
  Radio,
  FormControlLabel,
  FormControl,
  Slider,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useGetPropertiesQuery } from "../../reduxToolkit/apiSlice";
import { getRequestedFilters, getMinMaxValue } from "../../auxiliaryfunctions/auxiliaryfunctions";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  operation: string | null;
  setOperation: React.Dispatch<React.SetStateAction<string | null>>;
  type: string | null;
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  bedroom: string | null;
  setBedroom: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SecondFilters: React.FC<filterPorps> = ({
  setStringQuery,
  stringQuery,
  setCurrentPage,
  operation,
  setOperation,
  type,
  setType,
  bedroom,
  setBedroom,
}) => {
  const { data: allProperty } = useGetPropertiesQuery();
  const [value, setValue] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const GridId = event.currentTarget.id;
    const RadioId = (event.target as HTMLInputElement).value;

    // Construir el filtro correspondiente
    const filter = `${GridId}=${RadioId}`;

    if (RadioId !== undefined) {
      if (RadioId === "Todas") {
        setStringQuery((prevString) => {
          // Eliminar el filtro del grupo y ajustar los "&" adyacentes
          const regex = new RegExp(`(${GridId}=[^&]+)(&?)`, "g");
          const updatedString = prevString.replace(regex, "").replace(/^&+|&+$/, "");
          return updatedString;
        });
      } else {
        setStringQuery((prevString) => {
          // Verificar si el filtro del grupo ya existe
          if (prevString.includes(GridId)) {
            // Reemplazar el valor del filtro existente y ajustar los "&" adyacentes
            const regex = new RegExp(`(${GridId}=[^&]+)(&?)`, "g");
            const updatedString = prevString.replace(regex, filter + "$2").replace(/^&+|&+$/, "");
            return updatedString;
          } else {
            // Agregar un nuevo filtro
            const separator = prevString ? "&" : "";
            return prevString + separator + filter;
          }
        });
      }

      if (GridId == "operation") {
        setOperation(RadioId);
      } else if (GridId == "type") {
        setType(RadioId);
      } else {
        setBedroom(RadioId);
      }
    }

    setCurrentPage(1);
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    if (!stringQuery.includes("area=")) {
      // Concatenar maxPrice y su valor al stringQuery
      setStringQuery(stringQuery + `&area=${newValue}`);
    } else {
      // Actualizar el valor de maxPrice en stringQuery
      const regex = /area=\d+/; // Expresión regular para encontrar maxPrice y su valor
      setStringQuery(stringQuery.replace(regex, `area=${newValue}`));
    }
  };

  const handleChangePrice = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
    if (!stringQuery.includes("maxPrice=")) {
      // Concatenar maxPrice y su valor al stringQuery
      setStringQuery(stringQuery + `&maxPrice=${newValue}`);
    } else {
      // Actualizar el valor de maxPrice en stringQuery
      const regex = /maxPrice=\d+/; // Expresión regular para encontrar maxPrice y su valor
      setStringQuery(stringQuery.replace(regex, `maxPrice=${newValue}`));
    }

    setCurrentPage(1);
  };

  return (
    <Grid container sx={{}}>
      <Button onClick={handleDrawerOpen} sx={{}}>
        <TuneIcon sx={{ fontSize: "2rem" }} />
      </Button>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          style: {
            backgroundColor: "#ffe0b2",
          },
        }}
        sx={{ width: "100%", flexShrink: 0, mt: 20, position: "relative" }}
      >
        {
          <Grid
            container
            sx={{
              flexDirection: "column",
              backgroundColor: "#ffe0b2",
              borderRadius: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Grid
              item
              id="operation"
              sx={{
                p: 2,
              }}
              onClick={handleItemClick}
            >
              <Typography variant="h5">Tipo de operacion</Typography>
              {allProperty?.length ? (
                <FormControl component="fieldset">
                  {getRequestedFilters(allProperty, "operation").map((property, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          checked={operation === property}
                          /* onChange={() => handleRadioChange(property)} */
                          value={property}
                        />
                      }
                      label={property}
                      labelPlacement="start"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    />
                  ))}
                </FormControl>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>

            <Grid
              item
              id="type"
              sx={{
                p: 2,
              }}
              onClick={handleItemClick}
            >
              <Typography variant="h5">Tipo de Inmueble</Typography>
              {allProperty?.length ? (
                <FormControl component="fieldset">
                  {getRequestedFilters(allProperty, "type").map((property, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          checked={type === property}
                          /* onChange={() => handleRadioChange(property)} */
                          value={property}
                        />
                      }
                      label={property}
                      labelPlacement="start"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    />
                  ))}
                </FormControl>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>

            <Grid
              item
              id="bedroom"
              sx={{
                p: 2,
              }}
              onClick={handleItemClick}
            >
              <Typography variant="h5">Cantidad de Habitaciones</Typography>
              {allProperty?.length ? (
                <FormControl component="fieldset">
                  {getRequestedFilters(allProperty, "bedroom").map((property, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          checked={bedroom === `${property}`}
                          /* onChange={() => handleRadioChange(property)} */
                          value={property}
                        />
                      }
                      label={property !== "Todas" ? `Habitaciones ${property}` : property}
                      labelPlacement="start"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    />
                  ))}
                </FormControl>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>

            <Grid
              id="total_area"
              sx={{
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h5">Metros cuadrados</Typography>
              {allProperty?.length ? (
                <Grid item sx={{ mx: 2, display: "flex" }}>
                  <Slider
                    min={getMinMaxValue(allProperty, "total_area")[0]}
                    max={getMinMaxValue(allProperty, "total_area")[1]}
                    aria-label="Metros"
                    value={value}
                    onChange={handleChange}
                    sx={{ mr: 2 }}
                  />
                  <span>{value}</span>
                </Grid>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>

            <Grid
              id="price"
              sx={{
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h5">Precio</Typography>
              {allProperty?.length ? (
                <Grid item sx={{ mx: 2, display: "flex" }}>
                  <Slider
                    min={getMinMaxValue(allProperty, "price")[0]}
                    max={getMinMaxValue(allProperty, "price")[1]}
                    aria-label="Precio"
                    value={price}
                    onChange={handleChangePrice}
                    sx={{ mr: 2 }}
                  />
                  <span>{price}</span>
                </Grid>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>
          </Grid>
        }
      </Drawer>
    </Grid>
  );
};
