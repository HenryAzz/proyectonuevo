import {
  Grid,
  Card,
  CircularProgress,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import {
  useGetPropertiesQuery /* useGetPropertysFilterQuery */,
} from "../../reduxToolkit/apiSlice";
import { getRequestedFilters } from "../../auxiliaryfunctions/auxiliaryfunctions";
import { orange } from "@mui/material/colors";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
};

export const FirstFilters: React.FC<filterPorps> = ({ setStringQuery, stringQuery }) => {
  //const { data, isLoading } = useGetPropertysFilterQuery(stringQuery);
  const { data: allProperty } = useGetPropertiesQuery();

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardId = event.currentTarget.id;
    const checkboxId = (event.target as HTMLInputElement).id;
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
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        backgroundColor: "#ffe0b2a6",
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
                control={<Checkbox id={elem} />}
                label={elem}
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
                control={<Checkbox id={elem} />}
                label={elem}
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
                control={<Checkbox id={elem} />}
                label={`Total:  ${elem}`}
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
        onClick={handleItemClick}
      >
        <Typography variant="h5">cantidad de metros</Typography>
        {allProperty?.length ? (
          <FormControl component="fieldset">
            {getRequestedFilters(allProperty, "total_area").map((elem, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox id={elem} />}
                label={`${elem} metros`}
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
    </Grid>
  );
};
