import { Pagination as MuiPagination } from "@mui/material";

type PaginationProps = {
  favoritePerPage: number;
  totalFavoriteCount: number;
  onPageChange: (pageNumber: number) => void;
  currentPageFavorite: number;
};

export const PaginationFavoritos: React.FC<PaginationProps> = ({
  favoritePerPage,
  totalFavoriteCount,
  onPageChange,
  currentPageFavorite,
}) => {
  const pageCount = Math.ceil(totalFavoriteCount / favoritePerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <MuiPagination
      count={pageCount}
      page={currentPageFavorite} // Actualiza el valor de la página en el componente MuiPagination
      onChange={handlePageChange}
      color="primary"
      size="large"
      sx={{ my: 4, alignSelf: "center" }}
    />
  );
};
