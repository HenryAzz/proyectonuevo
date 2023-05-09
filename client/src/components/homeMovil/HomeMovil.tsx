import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
  Button,
  Box,
  ButtonGroup,
  Menu,
  MenuItem,
  Checkbox,
  FormControl,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/";
import { useState, useRef } from "react";
import { useGetPropertysFilterQuery } from "../../reduxToolkit/apiSlice";

type filterPorps = {
  stringQuery: string;
};

export const HomeMovil: React.FC<filterPorps> = ({ stringQuery }) => {
  const { data, isLoading } = useGetPropertysFilterQuery(stringQuery);

  isLoading && console.log(typeof isLoading, typeof data);

  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Grid container sx={{ justifyContent: "center", mt: 20 }}>
        <Grid item xs={8} sx={{ flexDirection: "column" }}>
          {data?.map((img, index) => (
            <Card key={index} sx={{ mb: 4 }}>
              {isLoading ? (
                <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
              ) : (
                <CardMedia sx={{ height: 200 }} image={img}></CardMedia>
              )}
              {isLoading ? (
                <Box sx={{ backgroundColor: "primary.light" }}>
                  <Skeleton animation="wave" height={30} width="30%" />
                  <Skeleton animation="wave" height={30} width="15%" />
                  <Skeleton animation="wave" height={30} width="30%" />
                </Box>
              ) : (
                <CardContent sx={{ backgroundColor: "primary.light" }}>
                  <Typography variant="subtitle1" component="h3">
                    Tipo de propiedad
                  </Typography>
                  <Typography variant="body2">Precio</Typography>
                  <Typography variant="body2">detalles generales</Typography>
                </CardContent>
              )}
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
