import {
  Grid,
  Card,
  CircularProgress,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useGetPropertysFilterQuery } from "../../reduxToolkit/apiSlice";
import { getRequestedFilters } from "../../auxiliaryfunctions/auxiliaryfunctions";
import { orange } from "@mui/material/colors";

type filterPorps = {
  setStringQuery: React.Dispatch<React.SetStateAction<string>>;
  stringQuery: string;
};

export const FirstFilters: React.FC<filterPorps> = ({ setStringQuery, stringQuery }) => {
  const { data, isLoading } = useGetPropertysFilterQuery(stringQuery);

  console.log(data, isLoading, setStringQuery);

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardId = event.currentTarget.id;
    const checkboxId = (event.target as HTMLInputElement).id;
    console.log(`${cardId}=${checkboxId}`);
  };

  return (
    <Grid container sx={{ flexDirection: "column", p: 2 }}>
      <Card
        id="operation"
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: orange[50],
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
        onClick={handleItemClick}
      >
        <Typography variant="h5">Tipo de operacion</Typography>
        {data?.length ? (
          <FormControl component="fieldset">
            {getRequestedFilters(data, "operation").map((elem, index) => (
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
      </Card>
      <Card
        id="type"
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: orange[50],
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
        onClick={handleItemClick}
      >
        <Typography variant="h5">Tipo de Inmueble</Typography>
        {data?.length ? (
          <FormControl component="fieldset">
            {getRequestedFilters(data, "type").map((elem, index) => (
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
      </Card>
    </Grid>
  );
};
