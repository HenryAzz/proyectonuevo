import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type CardProps = {
  address: string;
  description: string;
  pictures: string[];
  type: string;
  id: number;
};

export const CardComponent: React.FC<CardProps> = ({
  address,
  description,
  pictures,
  type,
  id,
}) => {
  const urlImage = pictures[0].img;
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={urlImage} height="150" alt="imagen" />
        <CardContent>
          <Typography variant="h4" mt={1}>
            {type}
          </Typography>
          <Typography component="h5" variant="body2" mt={1}>
            {address}
          </Typography>
          <Typography component="h5" variant="body2" mt={1}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" href="/" sx={{ margin: 1 }}>
          Hacer Reserva
        </Button>
        <Button variant="outlined" href={`/property/${id}`}>
          Mas Informacion
        </Button>
      </CardActions>
    </Card>
  );
};
