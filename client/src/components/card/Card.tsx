import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type CardProps = {
  address: string;
  description: string;
  pictures: Picture[];
  type: string;
  id: number;
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
}) => {
  const navigate = useNavigate();
  const urlImage = pictures[0].img;
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={urlImage} height="150" alt="imagen" />
        <CardContent>
          <Typography variant="h4" mt={1}>
            {type}
          </Typography>
          <Typography component="h6" variant="body2" mt={1}>
            {address}
          </Typography>
          <Typography component="h5" variant="body2" mt={1}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" href="#" sx={{ margin: 1 }}>
          Hacer Reserva
        </Button>
        <Button variant="outlined" onClick={() => navigate(`/property/${id}`)}>
          Mas Informacion
        </Button>
      </CardActions>
    </Card>
  );
};
