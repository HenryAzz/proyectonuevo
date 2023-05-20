import { Grid } from "@mui/material";
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
