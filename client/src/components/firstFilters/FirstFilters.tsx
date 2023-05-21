import {
  Grid,
  CircularProgress,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import {
  useGetPropertiesQuery /* useGetPropertysFilterQuery */,
} from "../../reduxToolkit/apiSlice";
import { getRequestedFilters, getUnicKeys } from "../../auxiliaryfunctions/auxiliaryfunctions";
import { useEffect } from "react";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
  checkedValues: Record<string, boolean>;
  setCheckedValues: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export const FirstFilters: React.FC<filterPorps> = ({
  setStringQuery,
  stringQuery,
  checkedValues,
  setCheckedValues,
}) => {
  //const { data, isLoading } = useGetPropertysFilterQuery(stringQuery);
  const { data: allProperty } = useGetPropertiesQuery();

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

    console.log("ID del FormControlLabel:", checkboxId);
    const isChecked = checkedValues[checkboxId];
    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      [checkboxId]: !isChecked,
    }));
  };

  return (
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
        <Typography variant="h5">Area</Typography>
        {allProperty?.length ? (
          <FormControl component="fieldset">
            {getRequestedFilters(allProperty, "total_area").map((elem, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={!!checkedValues[`${elem}`]} />}
                label={`${elem} metros`}
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
    </Grid>
  );
};
