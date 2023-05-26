import { NavBar } from "../navbar/Navbar";
import { favorite } from "../../reduxToolkit/favoritesInterface";
import { useGetFavoritesQuery } from "../../reduxToolkit/apiSlice";
import { Box, Grid, Typography } from "@mui/material";
import { CardComponent } from "../card/Card";
import { PaginationFavoritos } from "../pagination/paginatioFav";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";

type filterPorps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
export const Favorite: React.FC<filterPorps> = ({ currentPage, setCurrentPage }) => {
  const { data } = useGetFavoritesQuery();
  const [user, setUser] = useState<string | null | undefined>(null);

  const properties = data?.map((property: any) => { 
    return property.property 
  });

  // const favoritePerPage: number = 4;
  // const indexLastfavorite: number = currentPage * favoritePerPage;
  // const indexFirstfavorite: number = indexLastfavorite - favoritePerPage;
  // const currentfavorite: favorite[] = properties?.slice(indexFirstfavorite, indexLastfavorite) || [];

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {
          user ? (
            data?.length !== 0 ? (
              <Grid container flexDirection="column" alignContent="center">
                <Grid
                  container
                  spacing={2}
                  sx={{ mt: 2, width: "80vw", justifyContent: "space-around" }}
                >
                  {properties?.map((element: any, index: number) => (
                    <Grid item xs={8} sm={8} md={5} lg={5} key={index+51}>
                      <CardComponent
                        address={element.address}
                        description={element.description}
                        pictures={element.pictures}
                        type={element.type}
                        id={element.id}
                        operation={element.operation}
                        price={element.price}
                      />
                    </Grid>
                  ))}
                </Grid>
                {/* <PaginationFavoritos
                  favoritePerPage={favoritePerPage}
                  totalFavoriteCount={properties?.length || 0}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                /> */}
              </Grid>
            ) : (
              <Box mt={20}>
                <Typography variant="h4">Ningún Favorito Agregado</Typography>
              </Box>
            )
          ) : (
            <Box mt={20}>
              <Typography variant="h4">Debes Iniciar Sesión para Ver tus favoritos</Typography>
            </Box>
          )
        }
      </div>
    </div>
  );
};