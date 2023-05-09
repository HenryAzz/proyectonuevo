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
import { useGetPropertiesQuery } from "../../reduxToolkit/apiSlice";

export const HomeMovil = () => {
  const { data, isLoading } = useGetPropertiesQuery();

  isLoading && console.log(typeof isLoading, typeof data);

  const theme: Theme = useTheme();
  const isSmallScream: boolean = useMediaQuery(theme.breakpoints.down("sm"));

  let loading: boolean = false;

  let arrCard: string[] = [
    "https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp",
    "https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp",
    "https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp",
    "https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp",
    "https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp",
    "https://d1994bulhovht.cloudfront.net/856x440/listings/5fee2239-c481-4ba3-8e86-eed4a62f6535/92c8724f-1ba7-46fb-8331-1def9ae6693c.webp",
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setAnchorEl(ref.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Grid container sx={{ justifyContent: "center", mt: 20 }}>
        <Grid item xs={8} sx={{ flexDirection: "column" }}>
          {arrCard.map((img, index) => (
            <Card key={index} sx={{ mb: 4 }}>
              {loading ? (
                <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
              ) : (
                <CardMedia sx={{ height: 200 }} image={img}></CardMedia>
              )}
              {loading ? (
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
