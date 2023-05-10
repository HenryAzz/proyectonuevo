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
  key: number;
};

export const CardComponent: React.FC<CardProps> = ({
  address,
  description,
  pictures,
  type,
  key,
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
        <Button variant="contained">Hacer Reserva</Button>
        <Button variant="outlined">Mas Informacion</Button>
      </CardActions>
    </Card>
  );
};
