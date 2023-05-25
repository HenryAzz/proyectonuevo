import { Pagination as MuiPagination } from "@mui/material";

type PaginationProps = {
  propertyPerPage: number;
  totalPropertyCount: number;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  propertyPerPage,
  totalPropertyCount,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(totalPropertyCount / propertyPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <MuiPagination
      count={pageCount}
      page={currentPage} // Actualiza el valor de la página en el componente MuiPagination
      onChange={handlePageChange}
      color="primary"
      size="large"
      sx={{ my: 4, alignSelf: "center" }}
    />
  );
};
