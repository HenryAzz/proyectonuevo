import Favorites from "../favorite/Fav";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";
import { useGetFavoritesQuery } from "../../reduxToolkit/apiSlice";
import { useEffect, useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  useCreateFavoriteMutation,
  useDeletFavoriteByIDMutation,
} from "../../reduxToolkit/apiSlice";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type CardProps = {
  address: string;
  description: string;
  pictures: Picture[];
  type: string;
  id: number;
  operation: string;
  price: number;
  target: string;
  grade: number;
  message: string;
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
  const navigate = useNavigate();
  const { data, isLoading: getFavorites, isError: errorGetFavorites } = useGetFavoritesQuery();
  const [isFavorito, setIsFavorito] = useState(false);
  const [idFavorite, setIdFavorite] = useState();
  const [user, setUser] = useState<string | null | undefined>(null);
  const [createFavorite] = useCreateFavoriteMutation();
  const [deleteFavorite, { isError: errorDeleteFavorite, isSuccess: successDeleteFavorite }] =
    useDeletFavoriteByIDMutation();

  const [favorito, setFavorito] = useState({
    propertyId: "",
    email: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const properties = data?.map((property: any) => {
    return {
      favoriteId: property.id,
      userId: property.user.id,
      id: property.property.id,
      type: property.property.type,
      address: property.property.address,
      spaces: property.property.spaces,
      price: property.property.price,
      pictures: property.property.pictures[0].img,
      floors: property.property.floors,
      covered_area: property.property.covered_area,
      bathroom: property.property.bathroom,
      bedroom: property.property.bedroom,
      furnished: property.property.furnished,
      description: property.property.description,
      situation: property.property.situation,
      total_area: property.property.total_area,
      antiquity: property.property.antiquity,
      operation: property.property.operation,
      owner: property.property.owner,
    };
  });

  useEffect(() => {
    properties?.forEach((element) => {
      if (element.id === id) {
        setIsFavorito(true);
        setIdFavorite(element.favoriteId);
      }
    });
  }, [properties]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
        setFavorito({ ...favorito, ["propertyId"]: id, ["email"]: user.email });
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const handleChangeFavorite = (id: any) => {
    if (isFavorito) {
      setIsFavorito(false);
      deleteFavorite(idFavorite);

      Toast.fire({
        icon: "info",
        title: "Propiedad Eliminada de tus Favoritos",
      });
    } else {
      setIsFavorito(true);
      createFavorite(favorito);

      Toast.fire({
        icon: "success",
        title: "Propiedad Agregada a tus Favoritos",
      });
    }
  };

  return (
    <Card key={id}>
      <CardActionArea>
        <CardMedia component="img" src={pictures[0].img} height="150" alt="imagen" />
        <CardContent>
          {user ? (
            <IconButton
              onClick={() => handleChangeFavorite(id)}
              key={id}
              color={isFavorito ? "primary" : "default"}
            >
              {isFavorito ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          ) : (
            false
          )}

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
