/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetPropertysFilterQuery } from "../../reduxToolkit/apiSlice";
import { CardComponent } from "../card/Card";
import { property } from "../../reduxToolkit/propertyinterfaces";
import { Pagination } from "../pagination/pagination";

type filterPorps = {
  stringQuery: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const HomeDesktop: React.FC<filterPorps> = ({
  stringQuery,
  currentPage,
  setCurrentPage,
}) => {
  const { data } = useGetPropertysFilterQuery(stringQuery, { refetchOnMountOrArgChange: true });
  const propertyPerPage: number = 4;
  const indexLastproperty: number = currentPage * propertyPerPage;
  const indexFirstproperty: number = indexLastproperty - propertyPerPage;
  const currentproperty: property[] = data?.slice(indexFirstproperty, indexLastproperty) || [];

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {data?.length !== 0 ? (
        <Grid container flexDirection="column" alignContent="center">
          <Grid container spacing={2} sx={{ mt: 2, width: "80vw", justifyContent: "space-around" }}>
            {currentproperty.map((element: any, index: number) =>
              element.situation === "Disponible" ? (
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
              ) : null
            )}
          </Grid>
          <Pagination
            propertyPerPage={propertyPerPage}
            totalPropertyCount={data?.length || 0}
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
  );
};
//
