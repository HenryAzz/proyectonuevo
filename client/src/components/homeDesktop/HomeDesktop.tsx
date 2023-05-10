import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetPropertysFilterQuery } from "../../reduxToolkit/apiSlice";
import { CardComponent } from "../card/Card";

type filterPorps = {
  stringQuery: string;
};

export const HomeDesktop: React.FC<filterPorps> = ({ stringQuery }) => {
  const { data, isLoading } = useGetPropertysFilterQuery(stringQuery);

  isLoading ? console.log("cargando") : console.log(data);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data?.length !== 0 ? (
        <Grid container spacing={2} sx={{ justifyContent: "center", mt: 18 }}>
          {data?.map((element, index) => (
            <Grid item xs={8} sm={8} md={3} lg={3} key={index}>
              <CardComponent
                address={element.address}
                description={element.description}
                pictures={element.pictures}
                type={element.type}
                id={element.id}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box mt={20}>
          <Typography variant="h4">Sin propiedades para mostrar</Typography>
        </Box>
      )}
    </div>
  );
};
//
