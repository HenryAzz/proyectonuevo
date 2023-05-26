import { NavBar } from "../navbar/Navbar";
import { favorite } from "../../reduxToolkit/favoritesInterface";
import { useGetFavoritesQuery } from "../../reduxToolkit/apiSlice";
import { Box, Grid, Typography } from "@mui/material";
import { CardComponent } from "../card/Card";
import { PaginationFavoritos } from "../pagination/paginatioFav";

type filterPorps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const Favorite: React.FC<filterPorps> = ({ currentPage, setCurrentPage }) => {
  const { data } = useGetFavoritesQuery();

  // console.log(data[0].property);
  const favoritePerPage: number = 4;
  const indexLastfavorite: number = currentPage * favoritePerPage;
  const indexFirstfavorite: number = indexLastfavorite - favoritePerPage;
  const currentfavorite: favorite[] = data?.slice(indexFirstfavorite, indexLastfavorite) || [];

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data?.length !== 0 ? (
          <Grid container flexDirection="column" alignContent="center">
            <Grid
              container
              spacing={2}
              sx={{ mt: 2, width: "80vw", justifyContent: "space-around" }}
            >
              {currentfavorite.map((element: any, index: number) => (
                <Grid item xs={8} sm={8} md={5} lg={5} key={index}>
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
            <PaginationFavoritos
              favoritePerPage={favoritePerPage}
              totalFavoriteCount={data?.length || 0}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </Grid>
        ) : (
          <Box mt={20}>
            <Typography variant="h4">Sin propiedades disponibles</Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Favorite;
