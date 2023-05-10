import { Box, Container, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetPropertyByIdQuery } from "../../reduxToolkit/apiSlice";
import Divider from "@mui/material/Divider";

export const CardDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyByIdQuery(id);

  console.log(data);

  return (
    <Box sx={{ width: "100%", mt: 10 }}>
      <Container maxWidth="xl">
        {isLoading ? (
          <Typography variant="h4">Cargando...</Typography>
        ) : (
          <Grid
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
            container
            direction="column"
          >
            <Grid item>
              <img
                src={data!.pictures[0].img}
                style={{ width: "60vw", height: "70vh", borderRadius: "0.5em" }}
              />
            </Grid>
            <Divider />
            <Grid item>
              <Typography variant="h3">{data!.type}</Typography>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
