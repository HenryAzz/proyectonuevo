import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";

const Favorites = () => {
  const [favorito, setFavorito] = useState(false);

  const handleFavoritoClick = () => {
    setFavorito(!favorito);
  };

  return (
    <IconButton onClick={handleFavoritoClick} color={favorito ? "primary" : "default"}>
      {favorito ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default Favorites;
