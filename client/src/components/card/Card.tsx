import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

type CardProps = {
  address: string;
  description: string;
  pictures: Picture[];
  type: string;
  id: number;
  operation: string;
  price: number;
};

type Picture = {
  img: string;
};

export const CardComponent: React.FC<CardProps> = ({
  address,
  description,
  pictures,
  type,
  id,
  price,
}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" src={pictures[0].img} height="150" alt="imagen" />
        <CardContent>
          <Typography variant="h4" mt={1}>
            {type}
          </Typography>
          <Typography variant="h6" mt={1}>
            $ {price}
          </Typography>
          <Typography component="h6" variant="body2" mt={1}>
            {address}
          </Typography>
          <Typography component="h5" variant="body2" mt={1}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Grid container justifyContent="space-around">
        <Grid item xs={11} xl={5}>
          <Link to={`/reserva/${id}`} style={{}}>
            <Button variant="contained" sx={{ mb: 1, width: "100%" }}>
              Hacer Reserva
            </Button>
          </Link>
        </Grid>
        <Grid item xs={11} xl={5}>
          <Link to={`/property/${id}`} style={{}}>
            <Button variant="outlined" sx={{ mb: 1, width: "100%" }}>
              Mas Informacion
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};
