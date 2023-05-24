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
  Checkbox,
  FormControlLabel,
  FormControl,
  Slider,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useGetPropertiesQuery } from "../../reduxToolkit/apiSlice";
import {
  getRequestedFilters,
  getUnicKeys,
  getMinMaxValue,
} from "../../auxiliaryfunctions/auxiliaryfunctions";
import { useEffect } from "react";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
  checkedValues: Record<string, boolean>;
  setCheckedValues: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const SecondFilters: React.FC<filterPorps> = ({
  setStringQuery,
  stringQuery,
  checkedValues,
  setCheckedValues,
  setCurrentPage,
}) => {
  const { data: allProperty } = useGetPropertiesQuery();
  const [value, setValue] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const initialValues: Record<string, boolean> = {};

    if (allProperty !== undefined) {
      let keys = getUnicKeys(allProperty);
      keys.forEach((key) => {
        initialValues[key] = false;
      });
    }

    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      ...initialValues,
    }));
  }, [allProperty, setCheckedValues]);

  useEffect(() => {
    if (allProperty && allProperty.length > 0) {
      const minValue = getMinMaxValue(allProperty, "total_area")[0];
      setValue(minValue);
    }
    if (allProperty && allProperty.length > 0) {
      const minPrice = getMinMaxValue(allProperty, "price")[0];
      setPrice(minPrice);
    }
  }, [allProperty]);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardId = event.currentTarget.id;
    const checkboxId = (event.target as HTMLInputElement).name;
    const searchString = `${cardId}=${checkboxId}`;

    if (stringQuery.includes(searchString)) {
      // El estado stringQuery contiene la cadena generada por la función, así que la quitamos
      let updatedStringQuery = stringQuery
        .replace(`${searchString}&`, "")
        .replace(`&${searchString}`, "")
        .replace(searchString, "");
      updatedStringQuery = updatedStringQuery.startsWith("&")
        ? updatedStringQuery.substring(1)
        : updatedStringQuery;
      setStringQuery(updatedStringQuery);
    } else {
      // El estado stringQuery no contiene la cadena generada por la función, así que la agregamos
      const updatedStringQuery =
        stringQuery !== "?" ? `${stringQuery}&${searchString}` : `?${searchString}`;
      setStringQuery(updatedStringQuery);
    }

    const isChecked = checkedValues[checkboxId];
    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      [checkboxId]: !isChecked,
    }));
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    console.log(newValue);
  };

  const handleChangePrice = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
    console.log(newValue);
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
              /* backgroundColor: "#ffe0b2a6", */
            }}
          >
            <Grid
              id="operation"
              sx={{
                p: 2,
              }}
              onClick={handleItemClick}
            >
              <Typography variant="h5">Tipo de operacion</Typography>
              {allProperty?.length ? (
                <FormControl component="fieldset">
                  {getRequestedFilters(allProperty, "operation").map((elem, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox checked={!!checkedValues[elem]} />}
                      label={elem}
                      labelPlacement="start"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                      id={elem}
                      name={elem}
                    />
                  ))}
                </FormControl>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>

            <Grid
              id="type"
              sx={{
                p: 2,
              }}
              onClick={handleItemClick}
            >
              <Typography variant="h5">Tipo de Inmueble</Typography>
              {allProperty?.length ? (
                <FormControl component="fieldset">
                  {getRequestedFilters(allProperty, "type").map((elem, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox checked={!!checkedValues[elem]} />}
                      label={elem}
                      labelPlacement="start"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                      id={elem}
                      name={elem}
                    />
                  ))}
                </FormControl>
              ) : (
                <CircularProgress sx={{ fontSize: "3rem" }} />
              )}
            </Grid>

            <Grid
              id="bedroom"
              sx={{
                p: 2,
              }}
              onClick={handleItemClick}
            >
              <Typography variant="h5">cantidad de habitaciones</Typography>
              {allProperty?.length ? (
                <FormControl component="fieldset">
                  {getRequestedFilters(allProperty, "bedroom").map((elem, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox checked={!!checkedValues[`${elem}`]} />}
                      label={`Total:  ${elem}`}
                      labelPlacement="start"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                      id={`${elem}`}
                      name={`${elem}`}
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
              onClick={handleItemClick}
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
              onClick={handleItemClick}
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
